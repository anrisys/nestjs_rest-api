import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { WebResponse } from '../model/web.model';
import { UserRegistrationRequest } from '../model/user.model';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  // @Post('login')
  // signIn(@Body() signInDto: Record<string, any>) {
  //   // Change record into login request type (can be model)
  //   return this.authService.signIn(signInDto.username, signInDto.password);
  // }
  // TODO: Create route register
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
  // TODO: Create route sign In
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
