import {
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  if (!request.user) throw new InternalServerErrorException('User not found');
  if (data) return request.user[data];
  return request.user;
});
