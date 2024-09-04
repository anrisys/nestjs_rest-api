import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { PostService } from './post.service';
import { WebResponse } from '../model/web.model';
import { Posts } from './post.domain';
import { ZodValidationPipe } from '../common/validation.pipe';
import { CreatePostDto, PostValidation } from './post.schema';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../common/user.decorator';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('/api/posts')
export class PostController {
  constructor(
    private postService: PostService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  @Get()
  async retrieveAllPosts(): Promise<WebResponse<Posts[]>> {
    const result = await this.postService.findAll();

    return {
      data: [...result],
    };
  }

  @Get(':postId')
  async retrieveSinglePost(
    @Param('postId', ParseIntPipe) postId: string,
  ): Promise<WebResponse<Posts>> {
    const post = await this.postService.findOne(postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return {
      data: post,
    };
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(PostValidation.CREATE))
  async create(
    @Body() createPostDto: CreatePostDto,
    @User() user: string,
  ): Promise<WebResponse<Posts>> {
    const post = await this.postService.create({
      content: createPostDto.content,
      authorId: user,
    });
    return {
      message: 'Successfully created new Post',
      data: post,
    };
  }

  // TODO: Route update a post

  // TODO: Route delete a post
}
