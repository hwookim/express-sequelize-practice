import "./config/env";
import App from "./app";
import express from "express";
import rootRouter from "./routers";
import sequelize from "./models";

new App()
  .setPort(3000)
  .setMiddleware(express.json())
  .setRouter("/api", rootRouter)
  .setErrorHandler((err, req, res, next) => console.log(err))
  .run({}, async () => {
    // force option must be only practice
    await sequelize.sync({ force: true });
  });
