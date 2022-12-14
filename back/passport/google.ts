import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/user";
import { redisClient } from "../redis";

export default () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: `${process.env.GOOGLE_CLIENT_ID}`, // 카카오 로그인에서 발급받은 REST API 키
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        callbackURL: "http://localhost:80/api/auth/google/callback", // 카카오 로그인 Redirect URI 경로
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any
      ) => {
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

            await redisClient.set(`${exUser.id}`, refreshToken);
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

            await redisClient.set(`${newUser.id}`, refreshToken);
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
