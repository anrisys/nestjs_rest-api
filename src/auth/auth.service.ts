import { HttpException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ValidationService } from '../common/validation.service';
import {
  UserLoginRequest,
  UserLoginResponse,
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

  async register(request: UserRegistrationRequest): Promise<boolean> {
    this.logger.info(`Register new user ${JSON.stringify(request.email)}`);
    const registerRequest: UserRegistrationRequest =
      this.validationService.validate(UserValidation.REGISTER, request);

    const existingUserWithSameEmail = await this.userService.findUser(
      'email',
      registerRequest.email,
    );

    if (existingUserWithSameEmail) {
      throw new HttpException('Email is already existed', 400);
    }

    registerRequest.password = await this.userService.hashPassword(
      registerRequest.password,
    );

    await this.userService.saveUser(registerRequest);

    return true;
  }
  async signIn(request: UserLoginRequest): Promise<UserLoginResponse> {
    this.logger.info(`User login ${JSON.stringify(request.email)}`);
    this.validationService.validate(UserValidation.LOGIN, request);

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

    const payload = { sub: user.id, email: user.email };

    return {
      name: user.name,
      access_token: await this.generateToken(payload),
    };
  }

  async generateToken(payload: {
    sub: string;
    email: string;
  }): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
