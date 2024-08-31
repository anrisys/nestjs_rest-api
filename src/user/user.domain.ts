import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Posts } from '../post/post.domain';

@Table
export class User extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => Posts)
  post: Posts[];
}
