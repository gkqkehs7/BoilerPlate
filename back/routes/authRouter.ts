import express from "express";
import querystring from "querystring";
import passport from "passport";
import bcrypt from "bcrypt";

import { redisClient } from "../redis";
import { authMiddleWare, refresh } from "../middlewares/auth";
import User from "../models/user";
const router = express.Router();

router.post("/signIn", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.message);
    }
    return res.status(200).send(user);
  })(req, res, next);
});

router.post("/signUp", async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: { email: req.body.email, provider: "local" },
    });

    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디 입니다");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
      provider: "local",
    });

    return res.status(201).send({ succes: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/kakao", passport.authenticate("kakao", { session: false }));
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
    session: false,
  }),
  (req, res) => {
    var userData = req.user;
    console.log(userData);
    const query = querystring.stringify({
      accessToken: userData!.accessToken,
      refreshToken: userData!.refreshToken,
      nickname: userData!.nickname,
      email: userData!.email,
      profileImage: userData!.ProfileImages,
    });
    res.redirect("http://localhost:3000/loginSuccess?" + query);
  }
);

router.get(
  "/naver",
  passport.authenticate("naver", { session: false, authType: "reprompt" })
);
router.get(
  "/naver/callback",
  passport.authenticate("naver", {
    failureRedirect: "/", // kakaoStrategy에서 실패한다면 실행
    session: false,
  }),
  (req, res) => {
    var userData = req.user;

    console.log(userData);
    const query = querystring.stringify({
      accessToken: userData!.accessToken,
      refreshToken: userData!.refreshToken,
      nickname: userData!.nickname,
      email: userData!.email,
      profileImage: userData!.ProfileImages,
    });
    res.redirect("http://localhost:3000/loginSuccess?" + query);
  }
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/", // kakaoStrategy에서 실패한다면 실행
    session: false,
  }),
  (req, res) => {
    var userData = req.user;
    const query = querystring.stringify({
      accessToken: userData!.accessToken,
      refreshToken: userData!.refreshToken,
      nickname: userData!.nickname,
      email: userData!.email,
      profileImage: userData!.ProfileImages,
    });
    res.redirect("http://localhost:3000/loginSuccess?" + query);
  }
);

router.get("/refreshToken", refresh);

router.get("/logout", authMiddleWare, async (req, res, next) => {
  try {
    await redisClient.get(`${req.myId}`).then(() => {
      redisClient.del(`${req.myId}`);
    });

    return res.status(200).send({ success: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/tokenValidTest", authMiddleWare, async (req, res, next) => {
  try {
    console.log(req.myId);
    return res.status(200).send({ message: "유효한 토큰" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
