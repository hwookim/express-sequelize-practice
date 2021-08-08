import App from "./app";
import express from "express";

const app = new App({
  port: 3000,
  middlewares: [express.json()],
  errorHandlers: [
    (err, req, res, next) => {
      console.log(err);
    },
  ],
});
app.run();
