import { Service } from "typedi";
import User, { UserAttributes, UserCreationAttributes } from "../models/User";

@Service()
export default class UserRepository {
  public async findById(
    id: UserAttributes["id"]
  ): Promise<UserAttributes | null> {
    return User.findByPk(id);
  }

  public async create(user: UserCreationAttributes): Promise<UserAttributes> {
    return User.create(user);
  }

  public async findByLoginId(
    loginId: UserAttributes["loginId"]
  ): Promise<UserAttributes | null> {
    return User.findOne({ where: { loginId } });
  }
}
