import {
  Body,
  HttpCode,
  JsonController,
  Post,
  Res,
  UseBefore,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import { Response } from "express";
import CreatePostRequest from "../requests/CreatePostRequest";
import PostService from "../services/PostService";
import { PostAttributes } from "../models/Post";
import AuthMiddleware from "../middlewares/AuthMiddleware";

@Service()
@JsonController("/posts")
export default class PostController {
  @Inject()
  private readonly postService: PostService;

  @Post()
  @HttpCode(201)
  @UseBefore(AuthMiddleware)
  public async write(
    @Body() req: CreatePostRequest,
    @Res() res: Response
  ): Promise<PostAttributes> {
    return await this.postService.write(req, res.locals.userId);
  }
}
