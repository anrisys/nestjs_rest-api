import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.domain';
import { UserRegistrationRequest } from 'src/model/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async saveUser(data: UserRegistrationRequest): Promise<void> {
    data.password = await this.hashPassword(data.password);
    await this.userModel.create({ data });
  }

  async findUser(identifier: string, value: string): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        identifier: value,
      },
    });
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
