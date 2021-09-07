import { Body, JsonController, OnUndefined, Post } from "routing-controllers";
import { Inject, Service } from "typedi";
import UserService from "../services/UserService";
import RegisterRequest from "../requests/RegisterRequest";

@Service()
@JsonController("/auth")
class AuthController {
  @Inject()
  private readonly userService: UserService;

  @Post("/register")
  @OnUndefined(201)
  async register(@Body() userCreateRequest: RegisterRequest): Promise<void> {
    return this.userService.create(userCreateRequest);
  }
}

export default AuthController;
