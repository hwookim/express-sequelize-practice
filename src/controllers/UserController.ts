import { Request, Response } from "express";
import UserCreateRequest from "../requests/user/UserCreateRequest";
import userService from "../services/UserService";

class UserController {
  public async create(req: Request, res: Response): Promise<void> {
    // TODO: request 검증
    const request = new UserCreateRequest(req);
    await userService.create(request);
    res.status(201).send();
  }
}

// TODO: 어떻게 하면 좋을지 더 생각해보기
export default new UserController();
