import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Posts } from './post.domain';
import { InjectModel } from '@nestjs/sequelize';
import { PostCreateRequest, PostUpdateRequest } from '../model/post.model';
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
      where: { id: Number(id) },
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

  async update(
    request: PostUpdateRequest,
    postId: string,
    userId: string,
  ): Promise<Posts> {
    const post: Posts = await this.findOne(postId);

    console.log(post);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.authorId !== Number(userId)) {
      throw new ForbiddenException('You are not allowed do this action');
    }

    await this.postModel.update(
      { ...request },
      {
        where: { id: post.id },
      },
    );

    return await this.findOne(postId);
  }

  async destroy(postId: string, userId: string): Promise<boolean> {
    const post = await this.findOne(postId);

    if (!post) {
      throw new NotFoundException('Post not Found');
    }

    if (post.authorId !== Number(userId)) {
      throw new ForbiddenException('You are not allowed to do this action');
    }

    const result = await this.postModel.destroy({ where: { id: postId } });

    if (result === 0) {
      throw new InternalServerErrorException('Please try again later');
    }

    return true;
  }
}
