import userRepository from "../repositories/UserRepository";
import UserCreateRequest from "../requests/UserCreateRequest";
import { UserCreationAttributes } from "../models/User";

class UserService {
  public async create(req: UserCreateRequest): Promise<void> {
    // TODO: password 암호화
    const user: UserCreationAttributes = { ...req };
    await userRepository.create(user);
  }
}

export default new UserService();
