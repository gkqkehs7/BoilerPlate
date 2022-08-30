import axios from "axios";

declare global {
  namespace Express {
    interface Request {
      kakaoId?: number;
    }
  }
}
