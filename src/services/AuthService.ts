import { Inject, Service } from "typedi";
import UserRepository from "../repositories/UserRepository";
import RegisterRequest from "../requests/RegisterRequest";
import { UserCreationAttributes } from "../models/User";
import bcrypt from "bcryptjs";
import env from "../config/env";
import JwtService from "./JwtService";
import LoginRequest from "../requests/LoginRequest";

@Service()
export default class AuthService {
  @Inject()
  private readonly userRepository: UserRepository;
  @Inject()
  private readonly jwtService: JwtService;

  public async register(req: RegisterRequest): Promise<string> {
    const hashedPassword = await bcrypt.hash(
      req.password,
      env.BCRYPT_SALT_ROUNDS
    );

    const user: UserCreationAttributes = { ...req, password: hashedPassword };
    const { id } = await this.userRepository.create(user);
    return this.jwtService.generate(id);
  }

  public async login(req: LoginRequest): Promise<string> {
    const user = await this.userRepository.findByLoginId(req.loginId);
    if (!user) {
      throw new Error("해당 id의 유저가 없습니다.");
    }
    const { id, password } = user;
    const isValidPassword = await bcrypt.compare(req.password, password);
    if (!isValidPassword) {
      throw new Error("비밀번호가 잘못되었습니다.");
    }
    return this.jwtService.generate(id);
  }
}
