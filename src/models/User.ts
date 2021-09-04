import { Optional } from "sequelize";
import {
  Table,
  Model,
  Column,
  IsUUID,
  PrimaryKey,
  Default,
  DataType,
  Unique,
  AllowNull,
} from "sequelize-typescript";

export interface UserAttributes {
  id: string;
  loginId: string;
  password: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

@Table({
  tableName: "user",
  underscored: true,
})
class User extends Model<UserAttributes, UserCreationAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id!: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(30))
  loginId!: string;

  @AllowNull(false)
  @Column
  password!: string;
}

export default User;
