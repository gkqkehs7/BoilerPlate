"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
class User extends sequelize_1.Model {
}
User.init({
    email: {
        type: sequelize_1.DataTypes.STRING(50),
        unique: true,
        allowNull: false,
    },
    nickname: {
        type: sequelize_1.DataTypes.STRING(20),
        unique: true,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    snsId: {
        type: sequelize_1.DataTypes.BIGINT,
    },
    provider: {
        type: sequelize_1.DataTypes.STRING(20),
    },
}, {
    sequelize: sequelize_2.sequelize,
    modelName: "User",
    tableName: "Users",
    charset: "utf8",
    collate: "utf8_general_ci",
});
exports.default = User;
