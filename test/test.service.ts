import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../src/user/user.domain';
import { Posts } from '../src/post/post.domain';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Posts) private postModel: typeof Posts,
  ) {}

  async deleteUser() {
    await this.userModel.destroy({ where: { email: 'newuser@example.com' } });
  }

  async deletePosts() {
    await this.postModel.destroy({ truncate: true });
  }

  async createUser() {
    await this.userModel.create({
      name: 'newuser',
      email: 'newuser@example.com',
      password: await bcrypt.hash('newuser123', 10),
    });
  }
}
