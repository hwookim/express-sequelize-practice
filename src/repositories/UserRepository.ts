import { Service } from "typedi";
import User, { UserAttributes, UserCreationAttributes } from "../models/User";

@Service()
class UserRepository {
  public async create(user: UserCreationAttributes): Promise<UserAttributes> {
    return User.create(user);
  }
}

export default UserRepository;
