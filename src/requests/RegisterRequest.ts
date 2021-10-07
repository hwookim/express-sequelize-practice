import { IsNotEmpty, IsString } from "class-validator";

export default class RegisterRequest {
  @IsNotEmpty()
  @IsString()
  public loginId: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}
