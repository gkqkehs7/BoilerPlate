import User from "./user";
export * from "./sequelize";

const db = {
  User,
};
export type dbType = typeof db;
