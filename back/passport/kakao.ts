import passport from "passport";
import { Strategy as KakaoStrategy } from "passport-kakao";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { redisClient } from "../redis";
dotenv.config();

import User from "../models/user";

export default () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: `${process.env.KAKAO_REST_API}`, // 카카오 로그인에서 발급받은 REST API 키
        callbackURL: "http://localhost:80/api/auth/kakao/callback", // 카카오 로그인 Redirect URI 경로
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any
      ) => {
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "kakao" },
          });
          // 이미 가입된 카카오 프로필이면 성공
          if (exUser) {
            //여기서 req 객체 추가?
            const accessToken = jwt.sign({ id: exUser.id }, "jwt-secret-key", {
              algorithm: "HS256",
              expiresIn: "20s",
            });
            const refreshToken = jwt.sign({ id: exUser.id }, "jwt-secret-key", {
              algorithm: "HS256",
              expiresIn: "14d",
            });

            var user = {
              email: profile._json.kakao_account.email,
              nickname: profile.username,
              ProfileImages: profile._json.properties.profile_image,
              accessToken: accessToken,
              refreshToken: refreshToken,
            };

            await redisClient.set(`${exUser.id}`, refreshToken);
            done(null, user); // 로그인 인증 완료
          } else {
            // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다

            const newUser = await User.create({
              email: profile._json.kakao_account.email,
              nickname: profile.username,
              snsId: `${profile.id}`,
              provider: "kakao",
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
              email: profile._json.kakao_account.email,
              nickname: profile.username,
              ProfileImages: profile._json.properties.profile_image,
              accessToken: accessToken,
              refreshToken: refreshToken,
            };

            // 프로필 사진까지 저장
            await redisClient.set(`${newUser.id}`, refreshToken);
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
