import { IsNotEmpty, IsString } from "class-validator";

class LoginRequest {
  @IsNotEmpty()
  @IsString()
  public loginId: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}

export default LoginRequest;
