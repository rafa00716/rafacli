import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ErrorHandler } from '../../utils/error.handler';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CreatePassGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();

    const createPasswordToken = req.body['token'];

    if (!createPasswordToken) {
      ErrorHandler.unauthorized();
    }

    const user = await this.authService.validateCreatePassword(req.body);

    if (!user) {
      ErrorHandler.unauthorized();
    }

    return true;
  }
}
