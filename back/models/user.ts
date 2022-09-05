import { Model, DataTypes } from "sequelize";
import { dbType } from "./index";
import { sequelize } from "./sequelize";

class User extends Model {
  public readonly id!: number;
  public nickname!: string;
  public email!: string;
  public password?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
    },
    snsId: {
      type: DataTypes.BIGINT,
    },
    provider: {
      type: DataTypes.STRING(20),
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
    charset: "utf8",
    collate: "utf8_general_ci",
  }
);

export default User;
