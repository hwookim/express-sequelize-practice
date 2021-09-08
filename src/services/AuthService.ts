import { Inject, Service } from "typedi";
import UserRepository from "../repositories/UserRepository";
import RegisterRequest from "../requests/RegisterRequest";
import { UserCreationAttributes } from "../models/User";
import bcrypt from "bcryptjs";
import env from "../config/env";
import JwtService from "./JwtService";

@Service()
class AuthService {
  @Inject()
  private readonly userRepository: UserRepository;
  @Inject()
  private readonly jwtService: JwtService;

  public async create(req: RegisterRequest): Promise<string> {
    const hashedPassword = await bcrypt.hash(
      req.password,
      env.BCRYPT_SALT_ROUNDS
    );

    const user: UserCreationAttributes = { ...req, password: hashedPassword };
    const { id } = await this.userRepository.create(user);
    return this.jwtService.generate(id);
  }
}

export default AuthService;
