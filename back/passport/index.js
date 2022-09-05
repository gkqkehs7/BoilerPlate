"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kakao_1 = __importDefault(require("./kakao"));
const naver_1 = __importDefault(require("./naver"));
exports.default = () => {
    kakao_1.default();
    naver_1.default();
};
