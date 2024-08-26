import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './post.domain';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [SequelizeModule.forFeature([Post])],
  providers: [PostService],
  controllers: [PostController],
  exports: [SequelizeModule],
})
export class PostModule {}
