import passport from "passport";
import User from "../models/user";
import kakao from "./kakao";

interface IUser {
  id: number;
  kakao_account_email: string;
  snsId: number;
  displayName: string;
}

type doneType = (error: any, user?: IUser | number) => void;

export default () => {
  passport.serializeUser((user: any, done) => {
    done(null, user);
  });

  passport.deserializeUser<number>(async (exUser: any, done) => {
    try {
      const user = await User.findOne({
        where: { id: exUser.id },
      });
      if (!user) {
        return done(new Error("no user"));
      }
      return done(null, user); // req.user
    } catch (err) {
      console.error(err);
      return done(err);
    }
  });

  kakao();
};
