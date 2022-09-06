import axios from "axios";

declare global {
  namespace Express {
    interface Request {
      user?: {
        accessToken: string;
        refreshToken: string;
        nickname: string;
        email: string;
        ProfileImages: string;
      };
    }
  }
}
