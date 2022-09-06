import express from "express";
import axios from "axios";
import querystring from "querystring";
import { KAKAO_URL } from "../constants/url";
import { authMiddleWare } from "../middlewares/auth";
import passport from "passport";
const router = express.Router();

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
