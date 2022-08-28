"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var hpp_1 = __importDefault(require("hpp"));
var helmet_1 = __importDefault(require("helmet"));
var userRouter_1 = __importDefault(require("./routes/userRouter"));
dotenv_1["default"].config();
var app = express_1["default"]();
var prod = process.env.NODE_ENV === "production";
app.set("port", prod ? process.env.PORT : 80);
if (prod) {
    app.use(hpp_1["default"]());
    app.use(helmet_1["default"]());
    app.use(morgan_1["default"]("combined"));
    app.use(cors_1["default"]({
        origin: "*",
        credentials: true
    }));
}
else {
    app.use(morgan_1["default"]("dev"));
    app.use(cors_1["default"]({
        origin: true,
        credentials: true
    }));
}
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use(cookie_parser_1["default"](process.env.COOKIE_SECRET));
app.use("/api/user", userRouter_1["default"]);
app.get("/", function (req, res, next) {
    res.send("server is running");
});
app.listen(app.get("port"), function () {
    console.log("server is running on " + app.get("port"));
});
