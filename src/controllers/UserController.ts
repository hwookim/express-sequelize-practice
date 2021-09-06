import { Response } from "express";
import RequestValidator from "../utils/RequestValidator";
import UserCreateRequest from "../requests/user/UserCreateRequest";
import userService from "../services/UserService";

class UserController {
  @RequestValidator(UserCreateRequest)
  public async create(req: UserCreateRequest, res: Response): Promise<void> {
    await userService.create(req);
    res.status(201).send();
  }
}

// TODO: 어떻게 하면 좋을지 더 생각해보기
export default new UserController();
