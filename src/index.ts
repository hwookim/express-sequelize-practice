import App from "./app";
import express from "express";
import rootRouter from "./routers";

const app = new App({
  port: 3000,
  middlewares: [express.json(), rootRouter],
  errorHandlers: [
    (err, req, res, next) => {
      console.log(err);
    },
  ],
});
app.run();
