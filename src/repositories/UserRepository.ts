import { Service } from "typedi";
import User, { UserAttributes, UserCreationAttributes } from "../models/User";

@Service()
class UserRepository {
  public async create(user: UserCreationAttributes): Promise<UserAttributes> {
    return User.create(user);
  }

  public async findByLoginId(
    loginId: UserAttributes["loginId"]
  ): Promise<UserAttributes | null> {
    return User.findOne({ where: { loginId } });
  }
}

export default UserRepository;
