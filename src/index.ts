import "./config/env";
import App from "./App";
import express from "express";
import cookieParser from "cookie-parser";
import AuthController from "./controllers/AuthController";
import PostController from "./controllers/PostController";
import sequelize from "./models";

new App()
  .setPort(3000)
  .setBaseUrl("/api")
  .setMiddleware([express.json(), cookieParser()])
  .setController([AuthController, PostController])
  .setErrorHandler((err, req, res, next) => console.log(err))
  .run({}, async () => {
    await sequelize.sync();
  });
