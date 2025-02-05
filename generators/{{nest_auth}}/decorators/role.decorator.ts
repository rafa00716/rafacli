import { SetMetadata } from '@nestjs/common';
import { Constant } from '../../utils/constants';
export const Role = (...args: string[]) =>
  SetMetadata(Constant.CHECK_ROLE_REQ_KEY, args);
