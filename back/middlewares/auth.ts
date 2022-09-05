import express from "express";
import axios from "axios";
import { KAKAO_URL } from "../constants/url";

export const kakaoMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .send({ message: "accessToken이 지급되지 않았습니다" });
  }

  await axios
    .get(`${KAKAO_URL.GET_TOKEN_INFO_API_URL}`, {
      headers: {
        Authorization: `Bearer ${req.headers.authorization}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        req.kakaoId = response.data.id;
        next();
      } else if (response.status === 401) {
        // 토큰 만료
        return res.status(401).send({ message: "토큰 만료" });
      } else if (response.status === -1) {
        return res.status(500).send({ message: "카카오 서버 에러" });
      } else if (response.status === -2) {
        return res.status(401).send({ message: "잘못된 토큰" });
      } else {
        return res.status(401).send({ message: "알 수 없는 에러" });
      }
    })
    .catch((error) => {
      if (req.headers.authorization) {
        return res.status(401).send({ message: "잘못된 토큰" });
      }
      console.error(error);
      next(error);
    });
};

export const naverMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .send({ message: "accessToken이 지급되지 않았습니다" });
  }

  await axios
    .get(`${KAKAO_URL.GET_TOKEN_INFO_API_URL}`, {
      headers: {
        Authorization: `Bearer ${req.headers.authorization}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        req.kakaoId = response.data.id;
        next();
      } else if (response.status === 401) {
        // 토큰 만료
        return res.status(401).send({ message: "토큰 만료" });
      } else if (response.status === -1) {
        return res.status(500).send({ message: "카카오 서버 에러" });
      } else if (response.status === -2) {
        return res.status(401).send({ message: "잘못된 토큰" });
      } else {
        return res.status(401).send({ message: "알 수 없는 에러" });
      }
    })
    .catch((error) => {
      if (req.headers.authorization) {
        return res.status(401).send({ message: "잘못된 토큰" });
      }
      console.error(error);
      next(error);
    });
};
