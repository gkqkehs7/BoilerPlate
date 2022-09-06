import express from "express";
import jwt from "jsonwebtoken";

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
};
