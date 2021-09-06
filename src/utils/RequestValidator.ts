import { NextFunction, Request, Response } from "express";
import BaseRequest from "../requests/BaseRequest";

function RequestValidator(RequestType: typeof BaseRequest) {
  return function (
    target: unknown,
    property: string,
    descriptor: PropertyDescriptor
  ): void {
    const origin = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      const request = new RequestType(req);
      await request.validate();
      return origin(request, res, next);
    };
  };
}

export default RequestValidator;
