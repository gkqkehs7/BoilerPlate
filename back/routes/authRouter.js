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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var axios_1 = __importDefault(require("axios"));
var querystring_1 = __importDefault(require("querystring"));
var url_1 = require("../constants/url");
var auth_1 = require("../middlewares/auth");
var router = express_1["default"].Router();
router.get("/kakao/redirect", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var code;
    return __generator(this, function (_a) {
        code = req.query.code;
        try {
            axios_1["default"]
                .post(url_1.KAKAO_URL.OAUTH_TOKEN_API_URL + "?grant_type=" + url_1.KAKAO_URL.GRANT_TYPE + "&client_id=" + url_1.KAKAO_URL.REST_API + "&redirect_uri=" + url_1.KAKAO_URL.REDIRECT_URL + "&code=" + code, {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
                }
            })
                .then(function (result) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios_1["default"]
                                .get("" + url_1.KAKAO_URL.GET_USER_DATA_API_URL, {
                                headers: {
                                    Authorization: "Bearer " + result.data.access_token
                                }
                            })
                                .then(function (response) {
                                console.log(response.data);
                                var query = querystring_1["default"].stringify({
                                    accessToken: result.data.access_token,
                                    refreshToken: result.data.refresh_token,
                                    user_id: response.data.id,
                                    nickname: response.data.properties.nickname,
                                    email: response.data.kakao_account.email,
                                    image: response.data.properties.profile_image
                                });
                                res.redirect("http://localhost:3000/loginSuccess?" + query);
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); })["catch"](function (error) {
                console.error(error);
                next(error);
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
        return [2 /*return*/];
    });
}); });
router.post("/refreshKakaoToken", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken, refreshToken, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                accessToken = req.headers.authorization;
                refreshToken = req.headers.refresh;
                if (!accessToken) {
                    return [2 /*return*/, res.status(401).send({ message: "access token 없음" })];
                }
                if (!refreshToken) {
                    return [2 /*return*/, res.status(401).send({ message: "refresh token 없음" })];
                }
                return [4 /*yield*/, axios_1["default"]
                        .post(url_1.KAKAO_URL.REFRESH_TOKEN + "?grant_type=refresh_token&client_id=" + url_1.KAKAO_URL.REST_API + "&refresh_token=" + refreshToken, {
                        headers: {
                            "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
                        }
                    })
                        .then(function (response) {
                        return res.status(200).send(response.data.access_token);
                    })["catch"](function (error) {
                        console.log(error);
                        return res.status(401).send({ message: error.response.data.error });
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/kakaoLogout", auth_1.kakaoMiddleware, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                accessToken = req.headers.authorization;
                console.log(accessToken);
                if (!accessToken) {
                    return [2 /*return*/, res.status(401).send({ message: "access token 없음" })];
                }
                return [4 /*yield*/, axios_1["default"]({
                        url: "" + url_1.KAKAO_URL.LOGOUT,
                        method: "POST",
                        headers: {
                            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                            Authorization: "Bearer " + accessToken
                        }
                    })
                        .then(function (response) {
                        return res.status(200).send({ success: true });
                    })["catch"](function (error) {
                        console.log(error);
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/tokenValidTest", auth_1.kakaoMiddleware, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            return [2 /*return*/, res.status(200).send({ message: "유효한 토큰" })];
        }
        catch (error) {
            console.log(error);
            next(error);
        }
        return [2 /*return*/];
    });
}); });
exports["default"] = router;
