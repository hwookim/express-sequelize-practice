import { Inject, Service } from "typedi";
import UserRepository from "../repositories/UserRepository";
import UserCreateRequest from "../requests/UserCreateRequest";
import { UserCreationAttributes } from "../models/User";
import bcrypt from "bcryptjs";
import env from "../config/env";

@Service()
class UserService {
  @Inject()
  private readonly userRepository: UserRepository;

  public async create(req: UserCreateRequest): Promise<void> {
    const hashedPassword = await bcrypt.hash(
      req.password,
      parseInt(env.BCRYPT_SALT_ROUNDS)
    );

    const user: UserCreationAttributes = { ...req, password: hashedPassword };
    await this.userRepository.create(user);
  }
}

export default UserService;
