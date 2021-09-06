import "./config/env";
import App from "./App";
import express from "express";
import sequelize from "./models";

new App()
  .setPort(3000)
  .setMiddleware(express.json())
  .setErrorHandler((err, req, res, next) => console.log(err))
  .run({}, async () => {
    // force option must be only practice
    await sequelize.sync({ force: true });
  });
