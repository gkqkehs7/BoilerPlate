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
exports.naverMiddleware = exports.kakaoMiddleware = void 0;
const axios_1 = __importDefault(require("axios"));
const url_1 = require("../constants/url");
exports.kakaoMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        return res
            .status(401)
            .send({ message: "accessToken이 지급되지 않았습니다" });
    }
    yield axios_1.default
        .get(`${url_1.KAKAO_URL.GET_TOKEN_INFO_API_URL}`, {
        headers: {
            Authorization: `Bearer ${req.headers.authorization}`,
        },
    })
        .then((response) => {
        if (response.status === 200) {
            req.kakaoId = response.data.id;
            next();
        }
        else if (response.status === 401) {
            // 토큰 만료
            return res.status(401).send({ message: "토큰 만료" });
        }
        else if (response.status === -1) {
            return res.status(500).send({ message: "카카오 서버 에러" });
        }
        else if (response.status === -2) {
            return res.status(401).send({ message: "잘못된 토큰" });
        }
        else {
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
});
exports.naverMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        return res
            .status(401)
            .send({ message: "accessToken이 지급되지 않았습니다" });
    }
    yield axios_1.default
        .get(`${url_1.KAKAO_URL.GET_TOKEN_INFO_API_URL}`, {
        headers: {
            Authorization: `Bearer ${req.headers.authorization}`,
        },
    })
        .then((response) => {
        if (response.status === 200) {
            req.kakaoId = response.data.id;
            next();
        }
        else if (response.status === 401) {
            // 토큰 만료
            return res.status(401).send({ message: "토큰 만료" });
        }
        else if (response.status === -1) {
            return res.status(500).send({ message: "카카오 서버 에러" });
        }
        else if (response.status === -2) {
            return res.status(401).send({ message: "잘못된 토큰" });
        }
        else {
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
});
