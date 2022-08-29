import React from "react";

const LoginPage = () => {
  const CLIENT_ID = "4fa59b6793e017cb3c54142657950f26";
  const REDIRECT_URI = "http://localhost:80/api/auth/kakao/redirect";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile_nickname,profile_image,account_email`;
  return (
    <div>
      <a id="kakao" href={KAKAO_AUTH_URL} class="btn">
        카카오톡 로그인
      </a>
    </div>
  );
};

export default LoginPage;
