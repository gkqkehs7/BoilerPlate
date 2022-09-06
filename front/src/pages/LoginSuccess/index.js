import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoginSuccess = (props) => {
  const search = useLocation().search;
  const navigate = useNavigate();

  useEffect(() => {
    var userData = {
      email: new URLSearchParams(search).get("email"),
      nickname: new URLSearchParams(search).get("nickname"),
      image: new URLSearchParams(search).get("profileImage"),
      accessToken: new URLSearchParams(search).get("accessToken"),
      refreshToken: new URLSearchParams(search).get("refreshToken"),
    };
    localStorage.setItem("userData", JSON.stringify(userData));

    if (userData) {
      navigate("/mainPage");
    }
  }, [search, navigate]);

  return <div>로그인 성공</div>;
};

export default LoginSuccess;
