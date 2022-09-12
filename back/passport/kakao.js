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
const passport_kakao_1 = require("passport-kakao");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const redis_1 = require("../redis");
dotenv_1.default.config();
const user_1 = __importDefault(require("../models/user"));
exports.default = () => {
    passport_1.default.use(new passport_kakao_1.Strategy({
        clientID: `${process.env.KAKAO_REST_API}`,
        callbackURL: "http://localhost:80/api/auth/kakao/callback", // 카카오 로그인 Redirect URI 경로
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const exUser = yield user_1.default.findOne({
                where: { snsId: profile.id, provider: "kakao" },
            });
            // 이미 가입된 카카오 프로필이면 성공
            if (exUser) {
                //여기서 req 객체 추가?
                const accessToken = jsonwebtoken_1.default.sign({ id: exUser.id }, "jwt-secret-key", {
                    algorithm: "HS256",
                    expiresIn: "20s",
                });
                const refreshToken = jsonwebtoken_1.default.sign({ id: exUser.id }, "jwt-secret-key", {
                    algorithm: "HS256",
                    expiresIn: "14d",
                });
                var user = {
                    email: profile._json.kakao_account.email,
                    nickname: profile.username,
                    ProfileImages: profile._json.properties.profile_image,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                };
                yield redis_1.redisClient.set(`${exUser.id}`, refreshToken);
                done(null, user); // 로그인 인증 완료
            }
            else {
                // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                const newUser = yield user_1.default.create({
                    email: profile._json.kakao_account.email,
                    nickname: profile.username,
                    snsId: `${profile.id}`,
                    provider: "kakao",
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
                    email: profile._json.kakao_account.email,
                    nickname: profile.username,
                    ProfileImages: profile._json.properties.profile_image,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                };
                // 프로필 사진까지 저장
                yield redis_1.redisClient.set(`${newUser.id}`, refreshToken);
                done(null, user); // 회원가입하고 로그인 인증 완료
            }
        }
        catch (error) {
            console.error(error);
            done(error);
        }
    })));
};
