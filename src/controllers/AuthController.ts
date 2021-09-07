import {
  Body,
  JsonController,
  OnUndefined,
  Post,
  Res,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import AuthService from "../services/AuthService";
import RegisterRequest from "../requests/RegisterRequest";
import { Response } from "express";

@Service()
@JsonController("/auth")
class AuthController {
  @Inject()
  private readonly userService: AuthService;

  @Post("/register")
  @OnUndefined(201)
  async register(
    @Body() userCreateRequest: RegisterRequest,
    @Res() res: Response
  ): Promise<void> {
    const token = await this.userService.create(userCreateRequest);
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
    });
  }
}

export default AuthController;
