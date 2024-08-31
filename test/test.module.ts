import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../src/user/user.domain';
import { Posts } from '../src/post/post.domain';
import { CommonModule } from '../src/common/common.module';

@Module({
  imports: [SequelizeModule.forFeature([User, Posts]), CommonModule],
  providers: [TestService],
})
export class TestModule {}
