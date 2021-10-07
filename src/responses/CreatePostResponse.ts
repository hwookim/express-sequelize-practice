import { IsInt, IsNotEmpty, IsString, validate } from "class-validator";
import { PostAttributes } from "../models/Post";

export default class CreatePostResponse {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  contents: string;

  constructor(post: PostAttributes) {
    this.id = post.id;
    this.contents = post.contents;
    validate(this);
  }
}
