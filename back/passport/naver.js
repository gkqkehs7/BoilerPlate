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
const passport_1 = __importDefault(require("passport"));
const passport_naver_v2_1 = require("passport-naver-v2");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_1 = __importDefault(require("../models/user"));
const redis_1 = require("../redis");
exports.default = () => {
    passport_1.default.use(new passport_naver_v2_1.Strategy({
        clientID: "vBZOhVnrUvYPK9gh81IN",
        clientSecret: "SjnJLwoeVT",
        callbackURL: "http://localhost:80/api/auth/naver/callback", // 카카오 로그인 Redirect URI 경로
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("naver profile", profile);
        try {
            const exUser = yield user_1.default.findOne({
                where: { snsId: profile.id, provider: "naver" },
            });
            if (exUser) {
                const accessToken = jsonwebtoken_1.default.sign({ id: exUser.id }, "jwt-secret-key", {
                    algorithm: "HS256",
                    expiresIn: "1d",
                });
                const refreshToken = jsonwebtoken_1.default.sign({ id: exUser.id }, "jwt-secret-key", {
                    algorithm: "HS256",
                    expiresIn: "14d",
                });
                var user = {
                    email: profile.email,
                    nickname: profile.name,
                    snsId: profile.id,
                    ProfileImages: profile.profileImage,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                };
                yield redis_1.redisClient.set(`${exUser.id}`, refreshToken);
                done(null, user);
            }
            else {
                const newUser = yield user_1.default.create({
                    email: profile.email,
                    nickname: profile.name,
                    snsId: profile.id,
                    provider: "naver",
                });
                const accessToken = jsonwebtoken_1.default.sign({ id: newUser.id }, "jwt-secret-key", {
                    algorithm: "HS256",
                    expiresIn: "1d",
                });
                const refreshToken = jsonwebtoken_1.default.sign({ id: newUser.id }, "jwt-secret-key", {
                    algorithm: "HS256",
                    expiresIn: "14d",
                });
                var user = {
                    email: profile.email,
                    nickname: profile.name,
                    snsId: profile.id,
                    ProfileImages: profile.profileImage,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                };
                yield redis_1.redisClient.set(`${newUser.id}`, refreshToken);
                done(null, user);
            }
        }
        catch (error) {
            console.error(error);
            done(error);
        }
    })));
};
