import { IsNotEmpty, IsString } from "class-validator";

class UserCreateRequest {
  @IsNotEmpty()
  @IsString()
  public loginId: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}

export default UserCreateRequest;
