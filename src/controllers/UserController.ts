import { Body, JsonController, OnUndefined, Post } from "routing-controllers";
import { Inject, Service } from "typedi";
import UserService from "../services/UserService";
import UserCreateRequest from "../requests/UserCreateRequest";

@Service()
@JsonController("/users")
class UserController {
  @Inject()
  private readonly userService: UserService;

  @Post()
  @OnUndefined(201)
  async create(@Body() userCreateRequest: UserCreateRequest): Promise<void> {
    return this.userService.create(userCreateRequest);
  }
}

export default UserController;
