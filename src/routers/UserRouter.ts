import express from "express";
import userController from "../controllers/UserController";

const userRouter = express();

userRouter.post("/", userController.create);

export default userRouter;
