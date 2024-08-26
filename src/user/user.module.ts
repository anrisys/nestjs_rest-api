import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.domain';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), PostModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [SequelizeModule, UserService],
})
export class UserModule {}
