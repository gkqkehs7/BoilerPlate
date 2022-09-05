import React, { useCallback } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const CLIENT_ID = "4fa59b6793e017cb3c54142657950f26";
  const REDIRECT_URI = "http://localhost:80/api/auth/kakao/redirect";
  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile_nickname,profile_image,account_email`;
  const KAKAO_AUTH_URL = `http://localhost:80/api/auth/kakao`;

  const NAVER_CLIENT_ID = "vBZOhVnrUvYPK9gh81IN";
  const NAVER_REDIRECT_URI = encodeURI(
    "http://localhost:80/api/auth/naver/redirect"
  );
  const NAVER_STATE = "RANDOM_STATE";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${NAVER_STATE}`;

  const GOOGLE_CLIENT_ID =
    "988903634022-8ai89kdqd5fdr349q9e9bvlfcq2p1npr.apps.googleusercontent.com";

  window.gapi.load("client:auth2", () => {
    window.gapi.client.init({
      clientId: GOOGLE_CLIENT_ID,
      plugin_name: "chat",
    });
  });

  const onSuccess = useCallback((res) => {
    const profile = res.getBasicProfile();

    console.log(profile);
    const userData = {
      email: profile.getEmail(),
      image: profile.getImageUrl(),
      name: profile.getName(),
    };

    axios
      .post("http://localhost:80/api/auth/google/redirect", {
        data: {
          email: userData.email,
          image: userData.image,
          name: userData.name,
        },
      })
      .then((response) => {
        console.log(response.data);

        var userData = {
          user_id: response.data.email,
          email: response.data.image,
          nickname: response.data.name,
          image: response.data.email,
          // accessToken: new URLSearchParams(search).get("accessToken"),
          // refreshToken: new URLSearchParams(search).get("refreshToken"),
        };
        localStorage.setItem("userData", JSON.stringify(userData));

        if (userData) {
          navigate("/mainPage");
        }
      });
  }, []);

  const onFailure = (res) => {
    alert("구글 로그인에 실패하였습니다");
    console.log("err", res);
  };

  return (
    <div>
      <a id="kakao" href={KAKAO_AUTH_URL}>
        카카오톡 로그인
      </a>

      <a href={NAVER_AUTH_URL}>네이버 로그인</a>

      <GoogleLogin
        className="google-button"
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Login with Google" // 버튼에 뜨는 텍스트
        cookiePolicy={"single_host_origin"}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
};

export default LoginPage;
