import { HttpException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ValidationService } from '../common/validation.service';
import {
  UserLoginRequest,
  UserRegistrationRequest,
} from 'src/model/user.model';
import { UserService } from '../user/user.service';
import { UserValidation } from '../user/user.validation';
import { Logger } from 'winston';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  async signIn(
    request: UserLoginRequest,
  ): Promise<{ name: string; access_token: string }> {
    const user = await this.userService.findUser('email', request.email);

    if (!user) {
      throw new HttpException('Email or password is wrong', 400);
    }

    const isPasswordCorrect = await this.userService.comparePassword(
      request.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException('Email of password is wrong', 400);
    }

    return {
      name: user.name,
      access_token: await this.createToken(user.id),
    };
  }

  async register(request: UserRegistrationRequest): Promise<boolean> {
    this.logger.info(`Register new user ${JSON.stringify(request)}`);
    const registerRequest: UserRegistrationRequest =
      this.validationService.validate(UserValidation.REGISTER, request);

    const existingUserWithSameEmail = await this.userService.findUser(
      'email',
      registerRequest.email,
    );

    if (!existingUserWithSameEmail) {
      throw new HttpException('Email already exists', 400);
    }

    registerRequest.password = await this.userService.hashPassword(
      registerRequest.password,
    );

    await this.userService.saveUser(registerRequest);

    return true;
  }

  async createToken(id: string): Promise<string> {
    return await this.jwtService.signAsync({ id: id });
  }
}
