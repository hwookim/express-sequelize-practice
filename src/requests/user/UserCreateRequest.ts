import { Request } from "express";
import BaseRequest from "../BaseRequest";
import { IsNotEmpty, IsString } from "class-validator";

interface UserCreateRequestProps extends Request {
  body: {
    loginId: string;
    password: string;
  };
}

class UserCreateRequest extends BaseRequest {
  @IsNotEmpty()
  @IsString()
  loginId: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(req: UserCreateRequestProps) {
    super(req);
    const { loginId, password } = req.body;
    this.loginId = loginId;
    this.password = password;
  }
}

export default UserCreateRequest;
