import { IsNotEmpty, IsString } from "class-validator";

export default class LoginRequest {
  @IsNotEmpty()
  @IsString()
  public loginId: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}
