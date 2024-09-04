import { Injectable } from '@nestjs/common';
import { Posts } from './post.domain';
import { InjectModel } from '@nestjs/sequelize';
import { PostCreateRequest } from '../model/post.model';
import { User } from '../user/user.domain';

@Injectable()
export class PostService {
  constructor(@InjectModel(Posts) private postModel: typeof Posts) {}

  async findAll(): Promise<Posts[]> {
    const posts = await this.postModel.findAll({
      include: { model: User, attributes: ['id', 'name'] },
    });
    return posts;
  }

  async findOne(id: string): Promise<Posts> {
    const post = await this.postModel.findOne({
      where: { id: id },
      include: { model: User, attributes: ['id', 'name'] },
    });
    return post;
  }

  async create(post: PostCreateRequest): Promise<Posts> {
    const newPost = await this.postModel.create({
      content: post.content,
      authorId: post.authorId,
    });

    return newPost;
  }

  // TODO: Update Post

  // TODO: Delete Post
}
