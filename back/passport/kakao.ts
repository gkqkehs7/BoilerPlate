import passport from "passport";
const KakaoStrategy = require("passport-kakao").Strategy;
import User from "../models/user";

import dotenv from "dotenv";
dotenv.config();

interface IProfile {
  id: number;
  kakao_account_email: string;
  displayName: string;
}

interface IUser {
  email: string;
  nickname: string;
  snsId: number;
  provider: string;
}

export default () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: "4fa59b6793e017cb3c54142657950f26", // 카카오 로그인에서 발급받은 REST API 키
        callbackURL: "http://localhost:80/api/auth/kakao/callback", // 카카오 로그인 Redirect URI 경로
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any
      ) => {
        console.log("kakao profile", profile);
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "kakao" },
          });
          // 이미 가입된 카카오 프로필이면 성공
          if (exUser) {
            //여기서 req 객체 추가?
            done(null, exUser); // 로그인 인증 완료
          } else {
            // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다

            const newUser = await User.create({
              email: profile._json.kakao_account.email,
              nickname: profile.username,
              snsId: profile.id,
              provider: "kakao",
            });

            // 프로필 사진까지 저장
            done(null, newUser); // 회원가입하고 로그인 인증 완료
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
