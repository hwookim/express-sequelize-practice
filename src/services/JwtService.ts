import { Service } from "typedi";
import * as jwt from "jsonwebtoken";
import env from "../config/env";

@Service()
class JwtService {
  public generate(userId: string): string {
    return jwt.sign({ userId }, env.JWT_SECRET, {
      expiresIn: env.TOKEN_EXPIRES_IN,
    });
  }
}

export default JwtService;
