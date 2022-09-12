import passport from "passport";
import bcrypt from "bcrypt";
const LocalStrategy = require("passport-local").Strategy;
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { redisClient } from "../redis";
dotenv.config();

import User from "../models/user";

export default () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // req.body.email
        passwordField: "password", // req.body.password
      },
      async (email: string, password: string, done: any) => {
        try {
          const exUser = await User.findOne({
            where: { email: email, provider: "local" },
          });

          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password!);

            if (result) {
              const accessToken = jwt.sign(
                { id: exUser.id },
                "jwt-secret-key",
                {
                  algorithm: "HS256",
                  expiresIn: "20s",
                }
              );
              const refreshToken = jwt.sign(
                { id: exUser.id },
                "jwt-secret-key",
                {
                  algorithm: "HS256",
                  expiresIn: "14d",
                }
              );

              var user = {
                email: exUser.email,
                nickname: exUser.nickname,
                accessToken: accessToken,
                refreshToken: refreshToken,
              };

              await redisClient.set(`${exUser.id}`, refreshToken);
              done(null, user);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { message: "존재하지 않는 유저입니다." });
          }
        } catch (error) {
          console.log("server-error22");
          console.error(error);
          done(error);
        }
      }
    )
  );
};
