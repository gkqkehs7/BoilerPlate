"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
// router.post("/google/redirect", async (req, res, next) => {
//   try {
//     console.log(req.body.data);
//     return res.status(200).send(req.body.data);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });
// router.get("/naver/redirect", async (req, res, next) => {
//   let code = req.query.code;
//   let state = req.query.state;
//   const NAVER_REDIRECT_URI = encodeURI(
//     "http://localhost:80/api/auth/naver/redirect"
//   );
//   const api_url =
//     "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" +
//     "vBZOhVnrUvYPK9gh81IN" +
//     "&client_secret=" +
//     "SjnJLwoeVT" +
//     "&redirect_uri=" +
//     `${NAVER_REDIRECT_URI}` +
//     "&code=" +
//     code +
//     "&state=" +
//     state;
//   try {
//     await axios({
//       url: `${api_url}`,
//       method: "GET",
//       headers: {
//         "Content-Type": "text/json;charset=utf-8",
//         "X-Naver-Client-Id": "vBZOhVnrUvYPK9gh81IN",
//         "X-Naver-Client-Secret": `SjnJLwoeVT`,
//       },
//     })
//       .then(async (response) => {
//         console.log(response.data);
//         await axios({
//           url: "https://openapi.naver.com/v1/nid/me",
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${response.data.access_token}`,
//             "Content-Type": "text/json;charset=utf-8",
//           },
//         }).then((result) => {
//           console.log(result.data);
//           const query = querystring.stringify({
//             accessToken: response.data.access_token,
//             refreshToken: response.data.refresh_token,
//             user_id: result.data.response.id,
//             nickname: result.data.response.name,
//             email: result.data.response.email,
//             image: result.data.response.profile_image,
//           });
//           res.redirect("http://localhost:3000/loginSuccess?" + query);
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });
router.get("/kakao", passport_1.default.authenticate("kakao"));
router.get("/kakao/callback", 
//? 그리고 passport 로그인 전략에 의해 kakaoStrategy로 가서 카카오계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
passport_1.default.authenticate("kakao", {
    failureRedirect: "/",
}), 
// kakaoStrategy에서 성공한다면 콜백 실행
(req, res) => {
    console.log(req.user);
    res.redirect("/");
});
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
exports.default = router;
