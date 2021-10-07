import { Service } from "typedi";
import * as jwt from "jsonwebtoken";
import env from "../config/env";

interface JwtPayload extends jwt.JwtPayload {
  userId: string;
}

@Service()
export default class JwtService {
  public generate(userId: string): string {
    return jwt.sign({ userId }, env.JWT_SECRET, {
      expiresIn: env.TOKEN_EXPIRES_IN,
    });
  }

  public verify(token: string): string {
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    return payload.userId;
  }
}
