import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { WebResponse } from '../model/web.model';
import {
  UserLoginRequest,
  UserRegistrationRequest,
  UserResponse,
} from '../model/user.model';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(
    @Body() request: UserRegistrationRequest,
  ): Promise<WebResponse<Record<string, string>>> {
    const result = await this.authService.register(request);
    if (result) {
      return {
        message: 'User successfully registered',
      };
    }
  }

  @HttpCode(200)
  @Post('/login')
  async login(
    @Body() request: UserLoginRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.authService.signIn(request);
    if (result) {
      return {
        message: 'Successfully login',
        data: result,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
