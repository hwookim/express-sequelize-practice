import { Inject, Service } from "typedi";
import PostRepository from "../repositories/PostRepository";
import { PostAttributes, PostCreationAttributes } from "../models/Post";
import CreatePostRequest from "../requests/CreatePostRequest";

@Service()
export default class PostService {
  @Inject()
  private readonly postRepository: PostRepository;

  public async write(
    req: CreatePostRequest,
    userId: string
  ): Promise<PostAttributes> {
    const post: PostCreationAttributes = {
      ...req,
      userId,
    };
    return this.postRepository.create(post);
  }

  public async remove(id: number): Promise<void> {
    const result = await this.postRepository.remove(id);
    if (!result) {
      throw new Error("삭제 대상이 없습니다.");
    }
  }
}