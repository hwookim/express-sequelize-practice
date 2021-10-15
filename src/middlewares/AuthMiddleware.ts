import { ExpressMiddlewareInterface } from "routing-controllers";
import { NextFunction, Request, Response } from "express";
import { Inject, Service } from "typedi";
import JwtService from "../services/JwtService";
import UserRepository from "../repositories/UserRepository";
import HttpError from "../errors/HttpError";

export interface AuthRequest extends Request {
  cookies: {
    accessToken: string;
  };
}

@Service()
export default class AuthMiddleware implements ExpressMiddlewareInterface {
  @Inject()
  private readonly jwtService: JwtService;

  @Inject()
  private readonly userRepository: UserRepository;

  public async use(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token = req.cookies.accessToken;
    if (!token) {
      throw new HttpError(401, "토큰이 없습니다.");
    }
    const userId = this.jwtService.verify(token);
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new HttpError(403, "잘못된 요청입니다.");
    }
    res.locals.userId = userId;
    next();
  }
}
