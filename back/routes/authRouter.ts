import express from "express";
import axios from "axios";
import querystring from "querystring";
const router = express.Router();

const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token";
const KAKAO_GRANT_TYPE = "authorization_code";
const KAKAO_CLIENT_id = "4fa59b6793e017cb3c54142657950f26";
const KAKAO_REDIRECT_URL = "http://localhost:80/api/auth/kakao/redirect";
const KAKAO_GET_USER_DATA_API_URL = "https://kapi.kakao.com/v2/user/me";

interface IUserData {}
router.get("/kakao/redirect", async (req, res, next) => {
  let code = req.query.code;
  try {
    axios
      .post(
        `${KAKAO_OAUTH_TOKEN_API_URL}?grant_type=${KAKAO_GRANT_TYPE}&client_id=${KAKAO_CLIENT_id}&redirect_uri=${KAKAO_REDIRECT_URL}&code=${code}`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((result) => {
        axios
          .get(`${KAKAO_GET_USER_DATA_API_URL}`, {
            headers: {
              Authorization: `Bearer ${result.data.access_token}`,
            },
          })
          .then((response) => {
            const query: IUserData = querystring.stringify({
              accessToken: result.data.access_token,
              refreshToken: result.data.refresh_token,
              nickname: response.data.properties.nickname,
              email: response.data.kakao_account.email,
              image: response.data.properties.profile_image,
            });
            res.redirect("http://localhost:3000/loginSuccess?" + query);
          });
      })
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.post("/tokenValidTest", async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

export default router;
