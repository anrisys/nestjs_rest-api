import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { PostService } from './post.service';
import { WebResponse } from '../model/web.model';
import { Posts } from './post.domain';
import { ZodValidationPipe } from '../common/validation.pipe';
import { PostInputData, PostSchema } from './post.schema';
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
  @UsePipes(new ZodValidationPipe(PostSchema.PostInputData))
  async create(
    @Body() createPostDto: PostInputData,
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

  @Put(':postId')
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(PostSchema.PostInputData))
  async update(
    @Param('postId') postId: any,
    @Body() updatePostDto: PostInputData,
    @User() userId: string,
  ): Promise<WebResponse<Posts>> {
    console.log('This is body', updatePostDto);
    console.log('User', userId);
    console.log('This is route param', postId);

    const updatedPost = await this.postService.update(
      updatePostDto,
      postId,
      userId,
    );

    return {
      message: 'Successfully updated a post',
      data: updatedPost,
    };
  }

  @Delete(':postId')
  @UseGuards(AuthGuard)
  async deletePost(
    @Param('postId') postId: string,
    @User() userId: string,
  ): Promise<WebResponse<boolean>> {
    const result = await this.postService.destroy(postId, userId);

    if (result) {
      return {
        message: 'Successfully delete a post',
      };
    }
  }
}
