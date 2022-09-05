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
const KakaoStrategy = require("passport-kakao").Strategy;
const user_1 = __importDefault(require("../models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = () => {
    passport_1.default.use(new KakaoStrategy({
        clientID: "4fa59b6793e017cb3c54142657950f26",
        callbackURL: "http://localhost:80/api/auth/kakao/callback",
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("kakao profile", profile);
        try {
            const exUser = yield user_1.default.findOne({
                where: { snsId: profile.id, provider: "kakao" },
            });
            // 이미 가입된 카카오 프로필이면 성공
            if (exUser) {
                done(null, exUser); // 로그인 인증 완료
            }
            else {
                // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                console.log(typeof profile.id);
                const newUser = yield user_1.default.create({
                    email: profile._json.kakao_account.email,
                    nickname: profile.username,
                    snsId: profile.id,
                    provider: "kakao",
                });
                // 프로필 사진까지 저장
                done(null, newUser); // 회원가입하고 로그인 인증 완료
            }
        }
        catch (error) {
            console.error(error);
            done(error);
        }
    })));
};
