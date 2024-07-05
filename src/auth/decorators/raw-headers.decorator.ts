import { createParamDecorator } from '@nestjs/common';

export const RawHeaders = createParamDecorator((data, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  return request.rawHeaders;
});
