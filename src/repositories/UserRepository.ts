import User, { UserCreationAttributes } from "../models/User";

class UserRepository {
  public async create(user: UserCreationAttributes): Promise<void> {
    await User.create(user);
  }
}

export default new UserRepository();
