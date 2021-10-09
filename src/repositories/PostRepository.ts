import { Service } from "typedi";
import Post, { PostAttributes, PostCreationAttributes } from "../models/Post";

@Service()
export default class PostRepository {
  public async findById(id: number): Promise<PostAttributes | null> {
    return Post.findByPk(id);
  }

  public async create(post: PostCreationAttributes): Promise<PostAttributes> {
    return Post.create(post);
  }

  public async update(id: number, contents: string) {
    return Post.update(
      {
        contents,
      },
      { where: { id } }
    );
  }

  public async remove(id: number): Promise<number> {
    const [deleted] = await Post.update(
      {
        removed: true,
      },
      {
        where: { id },
      }
    );
    return deleted;
  }
}
