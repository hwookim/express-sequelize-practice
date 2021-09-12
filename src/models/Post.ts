import { Optional } from "sequelize";
import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./User";

export interface PostAttributes {
  id: number;
  loginId: string;
  password: string;
}

export interface PostCreationAttributes
  extends Optional<PostAttributes, "id"> {}

@Table({
  tableName: "post",
  underscored: true,
})
export default class Post extends Model<
  PostAttributes,
  PostCreationAttributes
> {
  @AllowNull(false)
  @Column(DataType.STRING)
  contents!: string;

  @BelongsTo(() => User)
  user!: User;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  user_id!: string;
}
