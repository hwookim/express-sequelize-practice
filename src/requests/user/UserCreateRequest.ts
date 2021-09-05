import { Request } from "express";

interface UserCreateRequestProps extends Request {
  body: {
    loginId: string;
    password: string;
  };
}

class UserCreateRequest {
  loginId: string;
  password: string;

  constructor(props: UserCreateRequestProps) {
    const { loginId, password } = props.body;
    this.loginId = loginId;
    this.password = password;
  }
}

export default UserCreateRequest;
