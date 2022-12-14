"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.authMiddleWare = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = require("../redis");
const verify = (token) => {
    try {
        var decoded = jsonwebtoken_1.default.verify(token, "jwt-secret-key");
        return {
            ok: true,
            id: decoded.id,
        };
    }
    catch (err) {
        const error = err;
        return {
            ok: false,
            message: error.message,
        };
    }
};
const authMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    else {
        if (result.message == "jwt expired") {
            return res.status(402).send({ message: result.message });
        }
        else if (result.message == "jwt malformed") {
            return res.status(401).send({ message: result.message });
        }
        else {
            return res.status(500).send({ message: "server error" });
        }
    }
});
exports.authMiddleWare = authMiddleWare;
const refresh = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    var result = verify(refreshToken);
    if (result.ok) {
        yield redis_1.redisClient.get(`${result.id}`).then(() => {
            redis_1.redisClient.del(`${result.id}`);
        });
        const accessToken = jsonwebtoken_1.default.sign({ id: result.id }, "jwt-secret-key", {
            algorithm: "HS256",
            expiresIn: "20s",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ id: result.id }, "jwt-secret-key", {
            algorithm: "HS256",
            expiresIn: "14d",
        });
        yield redis_1.redisClient.set(`${result.id}`, refreshToken);
        return res.status(200).send({
            ok: true,
            data: { accessToken: accessToken, refreshToken: refreshToken },
        });
    }
    else {
        if (result.message == "jwt expired") {
            return res
                .status(402)
                .send({ message: "세션이 만료되었습니다 다시 로그인 해주세요" });
        }
        else if (result.message == "jwt malformed") {
            return res.status(401).send({ message: result.message });
        }
        else {
            return res.status(500).send({ message: "server error" });
        }
    }
});
exports.refresh = refresh;
