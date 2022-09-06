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
const express_1 = __importDefault(require("express"));
const querystring_1 = __importDefault(require("querystring"));
const auth_1 = require("../middlewares/auth");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get("/kakao", passport_1.default.authenticate("kakao", { session: false }));
router.get("/kakao/callback", passport_1.default.authenticate("kakao", {
    failureRedirect: "/",
    session: false,
}), (req, res) => {
    var userData = req.user;
    console.log(userData);
    const query = querystring_1.default.stringify({
        accessToken: userData.accessToken,
        refreshToken: userData.refreshToken,
        nickname: userData.nickname,
        email: userData.email,
        profileImage: userData.ProfileImages,
    });
    res.redirect("http://localhost:3000/loginSuccess?" + query);
});
router.get("/naver", passport_1.default.authenticate("naver", { session: false, authType: "reprompt" }));
router.get("/naver/callback", passport_1.default.authenticate("naver", {
    failureRedirect: "/",
    session: false,
}), (req, res) => {
    var userData = req.user;
    console.log(userData);
    const query = querystring_1.default.stringify({
        accessToken: userData.accessToken,
        refreshToken: userData.refreshToken,
        nickname: userData.nickname,
        email: userData.email,
        profileImage: userData.ProfileImages,
    });
    res.redirect("http://localhost:3000/loginSuccess?" + query);
});
router.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
}));
router.get("/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "/",
    session: false,
}), (req, res) => {
    var userData = req.user;
    const query = querystring_1.default.stringify({
        accessToken: userData.accessToken,
        refreshToken: userData.refreshToken,
        nickname: userData.nickname,
        email: userData.email,
        profileImage: userData.ProfileImages,
    });
    res.redirect("http://localhost:3000/loginSuccess?" + query);
});
router.post("/tokenValidTest", auth_1.kakaoMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).send({ message: "유효한 토큰" });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}));
exports.default = router;
