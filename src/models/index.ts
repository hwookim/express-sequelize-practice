import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import env from "../config/env";

const options: SequelizeOptions = {
  database: env.DB_NAME,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  host: env.DB_HOST,
  logging: !(process.env.NODE_ENV === "production"),
  dialect: "mysql",
  timezone: "+09:00",
};

const sequelize = new Sequelize(options);

export default sequelize;
