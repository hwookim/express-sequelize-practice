import {
  Body,
  Delete,
  HttpCode,
  JsonController,
  OnUndefined,
  Param,
  Post,
  Res,
  UseBefore,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import { Response } from "express";
import CreatePostRequest from "../requests/CreatePostRequest";
import PostService from "../services/PostService";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import CreatePostResponse from "../responses/CreatePostResponse";

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
  ): Promise<CreatePostResponse> {
    return await this.postService.write(req, res.locals.userId);
  }

  @Delete("/:id")
  @OnUndefined(204)
  @UseBefore(AuthMiddleware)
  public async remove(@Param("id") id: number): Promise<void> {
    await this.postService.remove(id);
  }
}
