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

  console.log(userData);
  return (
    <div>
      <div>{userData.nickname}님 로그인 성공!</div>

      <div onClick={apiTest}>토큰 유효 검사</div>
    </div>
  );
};

export default MainPage;
