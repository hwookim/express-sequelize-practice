import App from "./app";
import express from "express";
import rootRouter from "./routers";

new App()
  .setPort(3000)
  .setMiddleware([express.json(), rootRouter])
  .setErrorHandler((err, req, res, next) => console.log(err))
  .run();
