import {
  Body,
  Delete,
  HttpCode,
  JsonController,
  OnUndefined,
  Param,
  Post,
  Put,
  Res,
  UseBefore,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import { Response } from "express";
import CreatePostRequest from "../requests/CreatePostRequest";
import PostService from "../services/PostService";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import CreatePostResponse from "../responses/CreatePostResponse";
import UpdatePostRequest from "../requests/UpdatePostRequest";
import UpdatePostResponse from "../responses/UpdatePostResponse";

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

  @Put("/:id")
  @HttpCode(200)
  @UseBefore(AuthMiddleware)
  public async update(
    @Param("id") id: number,
    @Body() req: UpdatePostRequest
  ): Promise<UpdatePostResponse> {
    return await this.postService.update(id, req);
  }

  @Delete("/:id")
  @OnUndefined(204)
  @UseBefore(AuthMiddleware)
  public async remove(@Param("id") id: number): Promise<void> {
    await this.postService.remove(id);
  }
}
