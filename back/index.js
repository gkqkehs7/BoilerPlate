"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
const passport_1 = __importDefault(require("passport"));
const models_1 = require("./models");
const passport_2 = __importDefault(require("./passport"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const redis_1 = require("./redis");
dotenv_1.default.config();
const app = (0, express_1.default)();
const prod = process.env.NODE_ENV === "production";
app.set("port", prod ? process.env.PORT : 80);
(0, passport_2.default)();
models_1.sequelize
    .sync({ force: false })
    .then(() => {
    console.log("데이터베이스 연결 성공");
})
    .catch((err) => {
    console.error(err);
});
if (prod) {
    app.use((0, hpp_1.default)());
    app.use((0, helmet_1.default)());
    app.use((0, morgan_1.default)("combined"));
    app.use((0, cors_1.default)({
        origin: "*",
        credentials: true,
    }));
}
else {
    app.use((0, morgan_1.default)("dev"));
    app.use((0, cors_1.default)({
        origin: true,
        credentials: true,
    }));
}
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use(passport_1.default.initialize());
app.use("/api/auth", authRouter_1.default);
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err);
});
app.get("/", (req, res, next) => {
    res.send("server is running");
});
app.listen(app.get("port"), () => {
    console.log(`server is running on ${app.get("port")}`);
});
(0, redis_1.startRedis)();
