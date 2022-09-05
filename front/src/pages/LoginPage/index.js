import React, { useCallback } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const KAKAO_AUTH_URL = `http://localhost:80/api/auth/kakao`;
  const NAVER_AUTH_URL = `http://localhost:80/api/auth/naver`;
  return (
    <div>
      <a id="kakao" href={KAKAO_AUTH_URL}>
        카카오톡 로그인
      </a>

      <a href={NAVER_AUTH_URL}>네이버 로그인</a>
    </div>
  );
};

export default LoginPage;
