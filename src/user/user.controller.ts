import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}
  // TODO:: Delete route controller
  // async register(
  //   @Body() request: RegisterUserRequest,
  // ): Promise<WebResponse<UserResponse>> {
  //   const result = await this.userService.register(request);
  //   return {
  //     data: result,
  //   };
  // }
}
