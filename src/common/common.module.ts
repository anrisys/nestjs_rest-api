import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { WinstonModule } from 'nest-winston';
import { Dialect } from 'sequelize';
import { Post } from 'src/post/post.domain';
import { User } from 'src/user/user.domain';
import * as winston from 'winston';
import { ValidationService } from './validation.service';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME_DEVELOPMENT,
      models: [User, Post],
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
  providers: [ValidationService],
  exports: [ValidationService],
})
export class CommonModule {}
