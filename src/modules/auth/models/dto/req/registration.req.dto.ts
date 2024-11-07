import { PickType } from '@nestjs/swagger';

import { BaseAuthReqDto } from './base-auth.req.dto';

export class RegistrationReqDto extends PickType(BaseAuthReqDto, [
  'email',
  'password',
  'bio',
  'name',
  'deviceId',
]) {}