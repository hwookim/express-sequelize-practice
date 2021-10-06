import { IsNotEmpty, IsString } from "class-validator";

export default class CreatePostRequest {
  @IsNotEmpty()
  @IsString()
  public contents: string;
}
