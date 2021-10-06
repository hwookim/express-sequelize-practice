import { Service } from "typedi";
import Post, { PostAttributes, PostCreationAttributes } from "../models/Post";

@Service()
class PostRepository {
  public async create(post: PostCreationAttributes): Promise<PostAttributes> {
    return Post.create(post);
  }
}

export default PostRepository;
