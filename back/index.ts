import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import hpp from "hpp";
import helmet from "helmet";

import authRouter from "./routes/authRouter";
dotenv.config();
const app = express();
const prod: boolean = process.env.NODE_ENV === "production";

app.set("port", prod ? process.env.PORT : 80);

if (prod) {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan("combined"));
  app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/auth", authRouter);
app.get("/", (req, res, next) => {
  res.send("server is running");
});

app.listen(app.get("port"), () => {
  console.log(`server is running on ${app.get("port")}`);
});
