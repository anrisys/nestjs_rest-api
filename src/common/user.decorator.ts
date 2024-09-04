import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// BUG: Add throwing error if there is no user in request (or is it already handled by jwt)
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.sub;
  },
);
