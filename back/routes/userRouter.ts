import express from "express";
import axios from "axios";
const router = express.Router();

const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token";
const KAKAO_GRANT_TYPE = "authorization_code";
const KAKAO_CLIENT_id = "4fa59b6793e017cb3c54142657950f26";
const KAKAO_REDIRECT_URL = "http://localhost:80/api/user/kakao/redirect";

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
        console.log(result);
        // 토큰을 활용한 로직을 적어주면된다.
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

export default router;
