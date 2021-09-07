import { IsNotEmpty, IsString } from "class-validator";

class RegisterRequest {
  @IsNotEmpty()
  @IsString()
  public loginId: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}

export default RegisterRequest;
