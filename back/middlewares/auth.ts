import express from "express";
import jwt from "jsonwebtoken";
import { redisClient } from "../redis";

interface IDecoded {
  id: number;
}
interface IError {
  message: string;
}

const verify = (token: string) => {
  try {
    var decoded = jwt.verify(token, "jwt-secret-key") as IDecoded;
    return {
      ok: true,
      id: decoded.id,
    };
  } catch (err) {
    const error = err as IError;
    return {
      ok: false,
      message: error.message,
    };
  }
};

export const authMiddleWare = async (
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

  var result = verify(accessToken);

  if (result.ok) {
    req.myId = result.id;
    next();
  } else {
    if (result.message == "jwt expired") {
      return res.status(402).send({ message: result.message });
    } else if (result.message == "jwt malformed") {
      return res.status(401).send({ message: result.message });
    } else {
      return res.status(500).send({ message: "server error" });
    }
  }
};

export const refresh = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  var accessToken = req.headers.authorization;
  var refreshToken = req.headers.refresh;

  if (!accessToken) {
    return res
      .status(401)
      .send({ message: "accessToken이 지급되지 않았습니다" });
  }

  if (!refreshToken) {
    return res
      .status(401)
      .send({ message: "refreshToken이 지급되지 않았습니다" });
  }

  var result = verify(refreshToken as string);

  if (result.ok) {
    await redisClient.get(`${result.id}`).then(() => {
      redisClient.del(`${result.id}`);
    });

    const accessToken = jwt.sign({ id: result.id }, "jwt-secret-key", {
      algorithm: "HS256",
      expiresIn: "20s",
    });
    const refreshToken = jwt.sign({ id: result.id }, "jwt-secret-key", {
      algorithm: "HS256",
      expiresIn: "14d",
    });

    await redisClient.set(`${result.id}`, refreshToken);

    return res.status(200).send({
      ok: true,
      data: { accessToken: accessToken, refreshToken: refreshToken },
    });
  } else {
    if (result.message == "jwt expired") {
      return res
        .status(402)
        .send({ message: "세션이 만료되었습니다 다시 로그인 해주세요" });
    } else if (result.message == "jwt malformed") {
      return res.status(401).send({ message: result.message });
    } else {
      return res.status(500).send({ message: "server error" });
    }
  }
};
