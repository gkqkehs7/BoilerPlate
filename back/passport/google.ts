import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/user";

export default () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "988903634022-8ai89kdqd5fdr349q9e9bvlfcq2p1npr.apps.googleusercontent.com", // 카카오 로그인에서 발급받은 REST API 키
        clientSecret: "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",
        callbackURL: "http://localhost:80/api/auth/google/callback", // 카카오 로그인 Redirect URI 경로
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any
      ) => {
        console.log(profile);
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "google" },
          });
          if (exUser) {
            const accessToken = jwt.sign({ id: exUser.id }, "jwt-secret-key", {
              algorithm: "HS256",
              expiresIn: "1d",
            });
            const refreshToken = jwt.sign({ id: exUser.id }, "jwt-secret-key", {
              algorithm: "HS256",
              expiresIn: "14d",
            });
            var user = {
              email: profile?.emails[0].value,
              nickname: profile.displayName,
              ProfileImages: profile?.photos[0].value,
              accessToken: accessToken,
              refreshToken: refreshToken,
            };
            done(null, user);
          } else {
            const newUser = await User.create({
              email: profile?.emails[0].value,
              nickname: profile.displayName,
              snsId: profile.id,
              provider: "google",
            });
            const accessToken = jwt.sign({ id: newUser.id }, "jwt-secret-key", {
              algorithm: "HS256",
              expiresIn: "1d",
            });
            const refreshToken = jwt.sign(
              { id: newUser.id },
              "jwt-secret-key",
              {
                algorithm: "HS256",
                expiresIn: "14d",
              }
            );
            var user = {
              email: profile?.emails[0].value,
              nickname: profile.displayName,
              ProfileImages: profile?.photos[0].value,
              accessToken: accessToken,
              refreshToken: refreshToken,
            };
            // 프로필 사진까지 저장
            done(null, user); // 회원가입하고 로그인 인증 완료
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
