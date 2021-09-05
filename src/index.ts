import "./config/env";
import express from "express";
import rootRouter from "./routers";
import sequelize from "./models";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", rootRouter);

app.listen(port, async () => {
  console.log("----------------------------------------");
  console.log("     Server listening on port " + port);
  console.log("----------------------------------------");
  // force option must be only practice
  await sequelize.sync({ force: true });
});
