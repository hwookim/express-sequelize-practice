import { Inject, Service } from "typedi";
import PostRepository from "../repositories/PostRepository";
import { PostCreationAttributes } from "../models/Post";
import CreatePostRequest from "../requests/CreatePostRequest";
import CreatePostResponse from "../responses/CreatePostResponse";
import UpdatePostRequest from "../requests/UpdatePostRequest";
import UpdatePostResponse from "../responses/UpdatePostResponse";
import HttpError from "../errors/HttpError";

@Service()
export default class PostService {
  @Inject()
  private readonly postRepository: PostRepository;

  public async write(
    req: CreatePostRequest,
    userId: string
  ): Promise<CreatePostResponse> {
    const post: PostCreationAttributes = {
      ...req,
      userId,
    };
    const created = await this.postRepository.create(post);
    return new CreatePostResponse(created);
  }

  public async update(
    id: number,
    req: UpdatePostRequest
  ): Promise<UpdatePostResponse> {
    const [, updated] = await this.postRepository.update(id, req.contents);
    return new UpdatePostResponse(updated[0]);
  }

  public async remove(id: number): Promise<void> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new HttpError(404, "해당 id의 post가 없습니다.");
    }
    if (post.removed) {
      throw new HttpError(400, "이미 삭제된 게시글입니다.");
    }
    await this.postRepository.remove(id);
  }
}
