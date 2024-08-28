import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../src/user/user.domain';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [TestService],
})
export class TestModule {}
