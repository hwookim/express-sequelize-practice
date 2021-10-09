import { IsNotEmpty, IsString } from "class-validator";

export default class UpdatePostRequest {
  @IsNotEmpty()
  @IsString()
  public contents: string;
}
