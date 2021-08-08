import App from "./app";
import express from "express";

const app = new App({
  port: 3000,
  middlewares: [express.json()],
});
app.run();
