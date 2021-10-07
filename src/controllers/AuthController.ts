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
import LoginRequest from "../requests/LoginRequest";
import { Response } from "express";
import cookieOption from "../config/cookie";

@Service()
@JsonController("/auth")
export default class AuthController {
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

  @Post("/login")
  @OnUndefined(200)
  public async login(
    @Body() req: LoginRequest,
    @Res() res: Response
  ): Promise<void> {
    const token = await this.authService.login(req);
    res.cookie("accessToken", token, cookieOption);
  }

  @Post("/logout")
  @OnUndefined(200)
  public async logout(@Res() res: Response): Promise<void> {
    res.clearCookie("accessToken");
  }
}
