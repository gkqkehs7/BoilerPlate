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
exports.kakaoMiddleware = void 0;
var axios_1 = __importDefault(require("axios"));
var url_1 = require("../constants/url");
exports.kakaoMiddleware = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.headers.authorization) {
                    return [2 /*return*/, res
                            .status(401)
                            .send({ message: "accessToken이 지급되지 않았습니다" })];
                }
                return [4 /*yield*/, axios_1["default"]
                        .get("" + url_1.KAKAO_URL.GET_TOKEN_INFO_API_URL, {
                        headers: {
                            Authorization: "Bearer " + req.headers.authorization
                        }
                    })
                        .then(function (response) {
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
                    })["catch"](function (error) {
                        if (req.headers.authorization) {
                            return res.status(401).send({ message: "잘못된 토큰" });
                        }
                        console.error(error);
                        next(error);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
