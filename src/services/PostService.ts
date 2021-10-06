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
}
