import { Service } from "typedi";
import User, { UserCreationAttributes } from "../models/User";

@Service()
class UserRepository {
  public async create(user: UserCreationAttributes): Promise<void> {
    await User.create(user);
  }
}

export default UserRepository;
