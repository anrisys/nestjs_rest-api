import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../src/user/user.domain';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TestService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async deleteUser() {
    await this.userModel.destroy({ where: { email: 'newuser@example.com' } });
  }

  async createUser() {
    await this.userModel.create({
      name: 'newuser',
      email: 'newuser@example.com',
      password: await bcrypt.hash('newuser123', 10),
    });
  }
}
