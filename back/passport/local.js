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
const bcrypt_1 = __importDefault(require("bcrypt"));
const LocalStrategy = require("passport-local").Strategy;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const redis_1 = require("../redis");
dotenv_1.default.config();
const user_1 = __importDefault(require("../models/user"));
exports.default = () => {
    passport_1.default.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password", // req.body.password
    }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const exUser = yield user_1.default.findOne({
                where: { email: email, provider: "local" },
            });
            if (exUser) {
                const result = yield bcrypt_1.default.compare(password, exUser.password);
                if (result) {
                    const accessToken = jsonwebtoken_1.default.sign({ id: exUser.id }, "jwt-secret-key", {
                        algorithm: "HS256",
                        expiresIn: "20s",
                    });
                    const refreshToken = jsonwebtoken_1.default.sign({ id: exUser.id }, "jwt-secret-key", {
                        algorithm: "HS256",
                        expiresIn: "14d",
                    });
                    var user = {
                        email: exUser.email,
                        nickname: exUser.nickname,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    };
                    yield redis_1.redisClient.set(`${exUser.id}`, refreshToken);
                    done(null, user);
                }
                else {
                    done(null, false, { message: "비밀번호가 일치하지 않습니다." });
                }
            }
            else {
                done(null, false, { message: "존재하지 않는 유저입니다." });
            }
        }
        catch (error) {
            console.log("server-error22");
            console.error(error);
            done(error);
        }
    })));
};
