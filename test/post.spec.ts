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
    beforeEach(async () => {
      await testService.deleteUser();
    });

    it('should return all posts', async () => {
      const response = await request(app.getHttpServer()).get('/api/posts');

      expect(response.status).toBe(200);
      expect(response.body.data).toBeTruthy();
    });
  });

  describe('GET /api/posts/:postId', () => {
    it('should return a post since the post exist', async () => {
      const response = await request(app.getHttpServer()).get('/api/posts/1');

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(1);
      expect(response.body.data.content).toBe('This is my new post');
    });

    it('should return null as the post not found', async () => {
      const response = await request(app.getHttpServer()).get('/api/posts/2');

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors.message).toBe('Post not found');
    });
  });

  describe('POST /api/posts', () => {
    let jwtToken: string;

    beforeEach(async () => {
      await testService.deleteUser();

      await testService.createUser();

      const loginResponse = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'newuser@example.com',
          password: 'newuser123',
        });

      logger.info(loginResponse.body);
      jwtToken = loginResponse.body.data;
    });

    it('should create a post successfully with valid JWT', async () => {
      const postData = {
        content: 'new post',
      };

      const response = await request(app.getHttpServer())
        .post('/api/posts')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(postData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.content).toBe(postData.content);
    });

    // it('should return 401 when JWT is missing', async () => {
    //   const response = await request(app.getHttpServer())
    //     .post('/api/posts')
    //     .send({
    //       content: '',
    //       authorId: '',
    //     });

    //   expect(response.status).toBe(401);
    //   expect(response.body).toBeDefined();
    // });
  });
});
