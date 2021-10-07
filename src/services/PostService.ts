import { Inject, Service } from "typedi";
import PostRepository from "../repositories/PostRepository";
import { PostCreationAttributes } from "../models/Post";
import CreatePostRequest from "../requests/CreatePostRequest";
import CreatePostResponse from "../responses/CreatePostResponse";

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

  public async remove(id: number): Promise<void> {
    const result = await this.postRepository.remove(id);
    if (!result) {
      throw new Error("삭제 대상이 없습니다.");
    }
  }
}
