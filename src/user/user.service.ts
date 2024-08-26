import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.domain';
// import { ValidationService } from 'src/common/validation.service';
// import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
// import { Logger } from 'winston';

@Injectable()
export class UserService {
  constructor(
    // private validationService: ValidationService,
    // @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    // @InjectModel(User) private userModel: typeof User,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  // async register(request: RegisterUserRequest): Promise<UserResponse> {
  //   this.logger.info(`Register new user ${JSON.stringify(request)}`);
  //   const registerRequest: RegisterUserRequest =
  //     this.validationService.validate(UserValidation.REGISTER, request);

  //   const existedUser = this.userModel.findOne({
  //     where: {
  //       email: registerRequest.email,
  //     },
  //   });

  //   if (!existedUser) {
  //     throw new HttpException('Email is already registerd', 400);
  //   }

  //   registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

  //   await this.userModel.create({ ...registerRequest });

  //   return {
  //     message: 'User successfully registered',
  //   };
  // }

  async findOne(email: string): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        email,
      },
    });
  }
}
