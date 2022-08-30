import dotenv from "dotenv";
dotenv.config();

export const KAKAO_URL = {
  OAUTH_TOKEN_API_URL: "https://kauth.kakao.com/oauth/token",
  GRANT_TYPE: "authorization_code",
  REST_API: `${process.env.KAKAO_REST_API}`,
  APP_ADMIN_KEY: `${process.env.KAKAO_APP_ADMIN_KEY}`,
  REDIRECT_URL: "http://localhost:80/api/auth/kakao/redirect",
  GET_USER_DATA_API_URL: "https://kapi.kakao.com/v2/user/me",
  GET_TOKEN_INFO_API_URL: "https://kapi.kakao.com/v1/user/access_token_info",
  REFRESH_TOKEN: "https://kauth.kakao.com/oauth/token",
  LOGOUT: "https://kapi.kakao.com/v1/user/logout",
};
