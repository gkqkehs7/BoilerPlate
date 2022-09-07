import React, { useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const MainPage = () => {
  let userData = JSON.parse(localStorage.getItem("userData"));

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

  const refreshToken = useCallback(async () => {
    await axios({
      url: "http://localhost:80/api/auth/refreshToken",
      method: "GET",
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
  });

  const logOut = useCallback(async () => {
    await axios({
      url: "http://localhost:80/api/auth/logout",
      method: "GET",
      headers: {
        authorization: userData.accessToken,
        refreshToken: userData.refreshToken,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  });

  console.log(userData);
  return (
    <div>
      <div>{userData.nickname}님 로그인 성공!</div>

      <div onClick={apiTest}>토큰 유효 검사</div>

      <div onClick={logOut}>토큰 재발급</div>

      <div onClick={logOut}>로그아웃</div>
    </div>
  );
};

export default MainPage;
