import express from "express";
import userRouter from "./UserRouter";

const rootRouter = express();

rootRouter.use("/user", userRouter);

export default rootRouter;
