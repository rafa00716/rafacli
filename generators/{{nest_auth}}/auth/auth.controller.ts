import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Patch,
  Param,
} from '@nestjs/common';
import { CreatePassGuard } from '../guards/create-pass.guard';
import { AuthService } from './auth.service';
import { CreatePassDto } from './dto/create-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @UseGuards(CreatePassGuard)
  @Post('create-password')
  createPassword(@Body() createPassDto: CreatePassDto) {
    this.authService.createPassword(createPassDto);
  }

  @Public()
  @Patch('reset-password/:email')
  async resetPassword(@Param('email') email: string) {
    return this.authService.resetPassword(email);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
