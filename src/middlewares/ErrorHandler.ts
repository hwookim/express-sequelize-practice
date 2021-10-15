import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from "routing-controllers";
import { NextFunction, Request, Response } from "express";
import HttpError from "../errors/HttpError";

@Middleware({ type: "after" })
export default class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(err: Error, req: Request, res: Response, next: NextFunction): void {
    console.error(err);
    if (err instanceof HttpError) {
      res.status(err.status).json(err.message);
      return;
    }
    res.status(500).json(err);
  }
}
