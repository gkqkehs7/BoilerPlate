import React, { useCallback } from "react";
import axios from "axios";

const MainPage = () => {
  let userData = JSON.parse(localStorage.getItem("userData"));

  const tokenValidTest = useCallback(async () => {
    await axios({
      url: "http://localhost:80/api/auth/tokenValidTest",
      method: "POST",
      headers: {
        authorization: userData.accessToken,
        a: 1,
      },
    });
  }, [userData.accessToken]);
  return (
    <div>
      <div>{userData.nickname}님 로그인 성공!</div>

      <div onClick={tokenValidTest}>토큰 유효 검사</div>
    </div>
  );
};

export default MainPage;
