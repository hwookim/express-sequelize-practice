import UserCreateRequest from "../requests/UserCreateRequest";
import userService from "../services/UserService";
import { Body, JsonController, OnUndefined, Post } from "routing-controllers";

@JsonController("/users")
class UserController {
  @Post()
  @OnUndefined(201)
  async create(@Body() userCreateRequest: UserCreateRequest): Promise<void> {
    return userService.create(userCreateRequest);
  }
}

export default UserController;
