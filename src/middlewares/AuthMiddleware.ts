import { ExpressMiddlewareInterface } from "routing-controllers";
import { NextFunction, Request, Response } from "express";
import { Inject, Service } from "typedi";
import JwtService from "../services/JwtService";
import UserRepository from "../repositories/UserRepository";

export interface AuthRequest extends Request {
  headers: {
    authorization: string;
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
    const token = req.headers.authorization.split("Bearer ")[1];
    if (!token) {
      throw new Error("토큰이 없습니다");
    }
    const userId = this.jwtService.verify(token);
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("잘못된 접근");
    }
    res.locals.userId = userId;
    next();
  }
}
