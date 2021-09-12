import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import env from "../config/env";
import User from "./User";
import Post from "./Post";

const options: SequelizeOptions = {
  database: env.DB_NAME,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  host: env.DB_HOST,
  logging: !(process.env.NODE_ENV === "production"),
  dialect: "mysql",
  timezone: "+09:00",
  models: [User, Post],
};

const sequelize = new Sequelize(options);

export default sequelize;
