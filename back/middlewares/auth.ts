import express from "express";
import jwt from "jsonwebtoken";

export const kakaoMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  var accessToken = req.headers.authorization;
  if (!accessToken) {
    return res
      .status(401)
      .send({ message: "accessToken이 지급되지 않았습니다" });
  }

  var decoded = jwt.verify(accessToken, "jwr-secretkey");

  console.log(decoded);
};
