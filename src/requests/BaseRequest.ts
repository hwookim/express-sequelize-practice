import { Request } from "express";
import { validate } from "class-validator";

class BaseRequest {
  req: Request;

  constructor(req: Request) {
    this.req = req;
  }

  async validate(): Promise<void> {
    const errors = await validate(this);
    if (!errors.length) {
      return;
    }

    throw new Error("요청이 잘못되었습니다.");
  }
}

export default BaseRequest;
