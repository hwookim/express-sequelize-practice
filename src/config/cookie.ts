import env from "./env";
import { CookieOptions } from "express";

const cookieOption: CookieOptions = {
  httpOnly: true,
  // secure: true, // https 를 이용해야함
  expires: new Date(Date.now() + env.TOKEN_EXPIRES_IN),
};

export default cookieOption;
