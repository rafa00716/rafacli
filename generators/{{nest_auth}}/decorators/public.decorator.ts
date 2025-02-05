import { SetMetadata } from '@nestjs/common';
import { Constant } from '../../utils/constants';
export const Public = (...args: string[]) =>
  SetMetadata(Constant.IS_PUBLIC_REQ_KEY, args);
