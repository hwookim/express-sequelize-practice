import { Optional } from "sequelize";
import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
  Default,
} from "sequelize-typescript";
import User from "./User";

export interface PostAttributes {
  id: number;
  contents: string;
  user: User;
  userId: string;
  removed?: boolean;
}

export interface PostCreationAttributes
  extends Optional<PostAttributes, "id" | "user"> {}

@Table({
  tableName: "post",
  underscored: true,
})
export default class Post extends Model<
  PostAttributes,
  PostCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  contents!: string;

  @BelongsTo(() => User)
  user!: User;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  userId!: string;

  @Default(false)
  @Column
  removed?: boolean;
}
