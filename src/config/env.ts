import * as dotenv from "dotenv";
dotenv.config();

const DAY_TO_MS = 24 * 60 * 60 * 1000;

const env = {
  DB_NAME: loadEnvironment("DB_NAME"),
  DB_USERNAME: loadEnvironment("DB_USERNAME"),
  DB_PASSWORD: loadEnvironment("DB_PASSWORD"),
  DB_HOST: loadEnvironment("DB_HOST"),
  BCRYPT_SALT_ROUNDS: +loadEnvironment("BCRYPT_SALT_ROUNDS"),
  JWT_SECRET: loadEnvironment("JWT_SECRET"),
  TOKEN_EXPIRES_IN: +loadEnvironment("TOKEN_EXPIRES_DAY") * DAY_TO_MS,
};

function loadEnvironment(key: string): string {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`환경변수 ${key}가 설정되지 않음`);
  }

  return value;
}

export default env;
