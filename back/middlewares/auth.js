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
exports.authMiddleWare = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
exports.authMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
