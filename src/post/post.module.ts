import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Posts } from './post.domain';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, SequelizeModule.forFeature([Posts])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
