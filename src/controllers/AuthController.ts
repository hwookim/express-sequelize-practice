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
import cookieOption from "../config/cookie";

@Service()
@JsonController("/auth")
class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post("/register")
  @OnUndefined(201)
  public async register(
    @Body() userCreateRequest: RegisterRequest,
    @Res() res: Response
  ): Promise<void> {
    const token = await this.authService.register(userCreateRequest);
    res.cookie("accessToken", token, cookieOption);
  }
}

export default AuthController;
