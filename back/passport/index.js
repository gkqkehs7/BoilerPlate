"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kakao_1 = __importDefault(require("./kakao"));
const naver_1 = __importDefault(require("./naver"));
const google_1 = __importDefault(require("./google"));
const local_1 = __importDefault(require("./local"));
exports.default = () => {
    (0, kakao_1.default)();
    (0, naver_1.default)();
    (0, google_1.default)();
    (0, local_1.default)();
};
