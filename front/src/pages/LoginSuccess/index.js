import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoginSuccess = (props) => {
  const search = useLocation().search;
  const navigate = useNavigate();

  useEffect(() => {
    var userData = {
      user_id: new URLSearchParams(search).get("user_id"),
      email: new URLSearchParams(search).get("email"),
      nickname: new URLSearchParams(search).get("nickname"),
      image: new URLSearchParams(search).get("image"),
      accessToken: new URLSearchParams(search).get("accessToken"),
      refreshToken: new URLSearchParams(search).get("refreshToken"),
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    navigate("/mainPage");
  }, [search, navigate]);

  return <div>로그인 성공</div>;
};

export default LoginSuccess;
