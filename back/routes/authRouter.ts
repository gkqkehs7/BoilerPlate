import express from "express";
import axios from "axios";
import querystring from "querystring";
import { KAKAO_URL } from "../constants/url";
import { kakaoMiddleware } from "../middlewares/auth";
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
    console.log("req.user:", req.user);
    res.redirect("/");

    // const query = querystring.stringify({
    //   accessToken: req.user.data.access_token,
    //   refreshToken: req.user.data.refresh_token,
    //   user_id: req.user.data.id,
    //   nickname: req.user.data.properties.nickname,
    //   email: req.user!.email,
    //   image: req.user.properties.profile_image,
    // });
    // res.redirect("http://localhost:3000/loginSuccess?" + query);
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
    console.log("req.user:", req.user);
    res.redirect("/");
  }
);

// router.get("/kakao/redirect", async (req, res, next) => {
//   let code = req.query.code;
//   try {
//     axios
//       .post(
//         `${KAKAO_URL.OAUTH_TOKEN_API_URL}?grant_type=${KAKAO_URL.GRANT_TYPE}&client_id=${KAKAO_URL.REST_API}&redirect_uri=${KAKAO_URL.REDIRECT_URL}&code=${code}`,
//         {
//           headers: {
//             "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
//           },
//         }
//       )
//       .then(async (result) => {
//         await axios
//           .get(`${KAKAO_URL.GET_USER_DATA_API_URL}`, {
//             headers: {
//               Authorization: `Bearer ${result.data.access_token}`,
//             },
//           })
//           .then((response) => {
//             console.log(response.data);
//             const query = querystring.stringify({
//               accessToken: result.data.access_token,
//               refreshToken: result.data.refresh_token,
//               user_id: response.data.id,
//               nickname: response.data.properties.nickname,
//               email: response.data.kakao_account.email,
//               image: response.data.properties.profile_image,
//             });
//             res.redirect("http://localhost:3000/loginSuccess?" + query);
//           });
//       })
//       .catch((error) => {
//         console.error(error);
//         next(error);
//       });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

// router.post("/refreshKakaoToken", async (req, res, next) => {
//   try {
//     const accessToken = req.headers.authorization;
//     const refreshToken = req.headers.refresh;

//     if (!accessToken) {
//       return res.status(401).send({ message: "access token 없음" });
//     }

//     if (!refreshToken) {
//       return res.status(401).send({ message: "refresh token 없음" });
//     }

//     await axios
//       .post(
//         `${KAKAO_URL.REFRESH_TOKEN}?grant_type=refresh_token&client_id=${KAKAO_URL.REST_API}&refresh_token=${refreshToken}`,
//         {
//           headers: {
//             "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
//           },
//         }
//       )
//       .then((response) => {
//         return res.status(200).send(response.data.access_token);
//       })
//       .catch((error) => {
//         console.log(error);
//         return res.status(401).send({ message: error.response.data.error });
//       });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

// router.post("/kakaoLogout", kakaoMiddleware, async (req, res, next) => {
//   try {
//     const accessToken = req.headers.authorization;

//     console.log(accessToken);
//     if (!accessToken) {
//       return res.status(401).send({ message: "access token 없음" });
//     }

//     await axios({
//       url: `${KAKAO_URL.LOGOUT}`,
//       method: "POST",
//       headers: {
//         "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     })
//       .then((response) => {
//         return res.status(200).send({ success: true });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

// router.post("/tokenValidTest", kakaoMiddleware, async (req, res, next) => {
//   try {
//     return res.status(200).send({ message: "유효한 토큰" });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

export default router;
