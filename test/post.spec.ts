import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('PostController', () => {
  let app: INestApplication;
  let logger: Logger;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });

  describe('GET /api/posts', () => {
    it('should return all posts', async () => {
      const response = await request(app.getHttpServer()).get('/api/posts');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeTruthy();
    });
  });

  describe('GET /api/posts/:postId', () => {
    it('should return a post since the post exist', async () => {
      const response = await request(app.getHttpServer()).get('/api/posts/1');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(1);
      expect(response.body.data.content).toBe('testing post');
    });

    it('should return null as the post not found', async () => {
      const response = await request(app.getHttpServer()).get('/api/posts/2');

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Post not found');
    });
  });

  describe('POST /api/posts', () => {
    let jwtToken: string;

    beforeEach(async () => {
      await testService.deletePosts();

      const loginResponse = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'newuser@example.com',
          password: 'newuser123',
        });

      logger.info(loginResponse.body);
      jwtToken = loginResponse.body.data.access_token;
    });

    it('should return 401 when JWT is missing', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/posts')
        .send({
          content: '',
          authorId: '',
        });

      expect(response.status).toBe(401);
      expect(response.body).toBeDefined();
    });

    it('should create a post successfully with valid JWT', async () => {
      const postData = {
        content: 'testing post',
      };

      const response = await request(app.getHttpServer())
        .post('/api/posts')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(postData);

      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.content).toBe(postData.content);
    });

    it('should reject the request as the data is not valid', async () => {
      const postData = { content: '' };

      const response = await request(app.getHttpServer())
        .post('/api/posts')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(postData);

      logger.info(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toBeDefined();
    });
  });

  describe('PUT /api/posts/:id', () => {
    let jwtToken: string;
    let postId: string;
    let newPost: any;
    beforeEach(async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'newuser@example.com',
          password: 'newuser123',
        });

      jwtToken = response.body.data.access_token;

      newPost = await request(app.getHttpServer())
        .post('/api/posts')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({ content: 'New Post' });

      postId = newPost.body.data.id;
    });

    it('should successfully update a post', async () => {
      const requestData = {
        content: 'New update post',
      };

      const response = await request(app.getHttpServer())
        .put(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({ ...requestData });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(postId);
      expect(response.body.data.content).toBe(requestData.content);
    });

    // TODO: Unit test for not owning the post
    it('should reject the update post request as the user does not own the post', async () => {
      await testService.createCustomUser(
        'seconduser',
        'seconduser@example.com',
        'seconduser890',
      );

      const loginResult = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'seconduser@example.com',
          password: 'seconduser890',
        });

      const tempBearerTOken = loginResult.body.data.access_token;

      const response = await request(app.getHttpServer())
        .put(`/api/post/${postId}`)
        .set('Authorization', `Bearer ${tempBearerTOken}`)
        .send({ content: 'Just changed' });

      const post = await testService.findPost(postId);

      logger.info(post);
      logger.info(response);

      expect(response.status).toBe(403);
      expect(post.content).toEqual(newPost.content);
    });
    // TODO: Unit test for invalid data
  });
});
