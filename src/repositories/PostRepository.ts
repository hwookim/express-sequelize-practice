import { Service } from "typedi";
import Post, { PostAttributes, PostCreationAttributes } from "../models/Post";

@Service()
export default class PostRepository {
  public async create(post: PostCreationAttributes): Promise<PostAttributes> {
    return Post.create(post);
  }

  public async remove(id: number): Promise<number> {
    return Post.destroy({ where: { id } });
  }
}
