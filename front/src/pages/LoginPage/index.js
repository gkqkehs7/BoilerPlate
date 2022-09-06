import React, { useCallback } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const KAKAO_AUTH_URL = `http://localhost:80/api/auth/kakao`;
  const NAVER_AUTH_URL = `http://localhost:80/api/auth/naver`;
  const GOOGLE_AUTH_URL = `http://localhost:80/api/auth/google`;
  return (
    <div>
      <div>
        <a id="kakao" href={KAKAO_AUTH_URL}>
          카카오톡 로그인
        </a>
      </div>

      <div>
        <a href={NAVER_AUTH_URL}>네이버 로그인</a>
      </div>

      <div>
        <a href={GOOGLE_AUTH_URL}>구글 로그인</a>
      </div>
    </div>
  );
};

export default LoginPage;
