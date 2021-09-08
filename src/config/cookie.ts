import env from "./env";
import { CookieOptions } from "express";

const cookieOption: CookieOptions = {
  httpOnly: true,
  secure: true,
  expires: new Date(Date.now() + env.TOKEN_EXPIRES_IN),
};

export default cookieOption;
