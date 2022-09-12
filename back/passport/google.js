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
const passport_google_oauth20_1 = require("passport-google-oauth20");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_1 = __importDefault(require("../models/user"));
exports.default = () => {
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: "988903634022-8ai89kdqd5fdr349q9e9bvlfcq2p1npr.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:80/api/auth/google/callback", // 카카오 로그인 Redirect URI 경로
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(profile);
        try {
            const exUser = yield user_1.default.findOne({
                where: { snsId: profile.id, provider: "google" },
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
                    email: profile === null || profile === void 0 ? void 0 : profile.emails[0].value,
                    nickname: profile.displayName,
                    ProfileImages: profile === null || profile === void 0 ? void 0 : profile.photos[0].value,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                };
                done(null, user);
            }
            else {
                const newUser = yield user_1.default.create({
                    email: profile === null || profile === void 0 ? void 0 : profile.emails[0].value,
                    nickname: profile.displayName,
                    snsId: profile.id,
                    provider: "google",
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
                    email: profile === null || profile === void 0 ? void 0 : profile.emails[0].value,
                    nickname: profile.displayName,
                    ProfileImages: profile === null || profile === void 0 ? void 0 : profile.photos[0].value,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                };
                // 프로필 사진까지 저장
                done(null, user); // 회원가입하고 로그인 인증 완료
            }
        }
        catch (error) {
            console.error(error);
            done(error);
        }
    })));
};
