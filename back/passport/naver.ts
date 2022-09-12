import passport from "passport";
import {
  Strategy as NaverStrategy,
  Profile as NaverProfile,
} from "passport-naver-v2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/user";
import { redisClient } from "../redis";

interface IProfile {
  id: number;
  response: {
    email: string;
    name: string;
    profile_image: string;
  };
}
export default () => {
  passport.use(
    new NaverStrategy(
      {
        clientID: `${process.env.NAVER_CLIENT_ID}`, // 카카오 로그인에서 발급받은 REST API 키
        clientSecret: `${process.env.NAVER_CLIENT_SECRET}`,
        callbackURL: "http://localhost:80/api/auth/naver/callback", // 카카오 로그인 Redirect URI 경로
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: NaverProfile,
        done: any
      ) => {
        console.log("naver profile", profile);

        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "naver" },
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
              email: profile.email,
              nickname: profile.name,
              snsId: profile.id,
              ProfileImages: profile.profileImage,
              accessToken: accessToken,
              refreshToken: refreshToken,
            };

            await redisClient.set(`${exUser.id}`, refreshToken);
            done(null, user);
          } else {
            const newUser = await User.create({
              email: profile.email,
              nickname: profile.name,
              snsId: profile.id,
              provider: "naver",
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
              email: profile.email,
              nickname: profile.name,
              snsId: profile.id,
              ProfileImages: profile.profileImage,
              accessToken: accessToken,
              refreshToken: refreshToken,
            };

            await redisClient.set(`${newUser.id}`, refreshToken);
            done(null, user);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
