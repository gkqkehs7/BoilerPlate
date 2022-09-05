import React, { useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const MainPage = () => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const apiTest = useCallback(async () => {
    await axios({
      url: "http://localhost:80/api/auth/tokenValidTest",
      method: "POST",
      headers: {
        authorization: userData.accessToken,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, [userData.accessToken]);

  const tokenRefresh = useCallback(async () => {
    await axios({
      url: "http://localhost:80/api/auth/refreshKakaoToken",
      method: "POST",
      headers: {
        authorization: userData.accessToken,
        refresh: userData.refreshToken,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, [userData.accessToken, userData.refreshToken]);

  const logOut = useCallback(async () => {
    await axios({
      url: "http://localhost:80/api/auth/kakaoLogout",
      method: "POST",
      headers: {
        authorization: userData.accessToken,
      },
    })
      .then(() => {
        localStorage.clear();
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, [userData.accessToken, navigate]);

  console.log(userData);
  return (
    <div>
      <div>{userData.nickname}님 로그인 성공!</div>

      <div onClick={apiTest}>토큰 유효 검사</div>

      <div onClick={tokenRefresh}>토큰 재발급 받기</div>

      <div onClick={logOut}>로그아웃</div>
    </div>
  );
};

export default MainPage;
