import { Inject, Service } from "typedi";
import UserRepository from "../repositories/UserRepository";
import UserCreateRequest from "../requests/UserCreateRequest";
import { UserCreationAttributes } from "../models/User";

@Service()
class UserService {
  @Inject()
  private readonly userRepository: UserRepository;

  public async create(req: UserCreateRequest): Promise<void> {
    // TODO: password 암호화
    const user: UserCreationAttributes = { ...req };
    await this.userRepository.create(user);
  }
}

export default UserService;
