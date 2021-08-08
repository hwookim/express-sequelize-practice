import express, { Request, Response } from "express";

const rootRouter = express();

rootRouter.use("/", (req: Request, res: Response) => {
  res.status(200).json("hi");
});

export default rootRouter;
