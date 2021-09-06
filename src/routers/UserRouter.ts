import express from "express";
import userController from "../controllers/UserController";
import wrapAsync from "../utils/wrapAsync";

const userRouter = express();

userRouter.post("/", wrapAsync(userController.create));

export default userRouter;
