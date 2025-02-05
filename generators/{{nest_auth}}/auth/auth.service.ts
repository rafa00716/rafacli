import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreatePassDto } from './dto/create-password.dto';
import { UsersService } from '../../resources/users/users.service';
import { ErrorHandler } from 'src/utils/error.handler';
import { LoginDto } from './dto/login.dto';
import { User } from '../../resources/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Constant } from '../../utils/constants';
import { config } from 'config/config';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createPassword(createPassDto: CreatePassDto) {
    const user = await this.usersService.findByEmail(createPassDto.email);
    if (!user) {
      ErrorHandler.notFoundEntry('User');
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createPassDto.password, salt);
    return this.usersService.update(user.id, { password: hash });
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.usersService.findByEmailOnlyPassword(
      loginDto.email,
    );

    if (!user) {
      ErrorHandler.notFoundEntry('User');
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      ErrorHandler.unauthorized('Email or Password are wrong');
    }

    return this.usersService.findByEmail(loginDto.email);
  }

  async validateCreatePassword(createPassDto: CreatePassDto) {
    const user = await this.usersService.findByEmail(createPassDto.email);

    if (!user) {
      ErrorHandler.notFoundEntry('User');
    }

    if (
      !user.resetPasswordToken ||
      user.resetPasswordToken !== createPassDto.token
    ) {
      ErrorHandler.unauthorized('Token are wrong');
    }
    const key = config.get(Constant.CREATE_PASS_KEY_NAME);

    let tokenPayload;
    try {
      tokenPayload = await this.jwtService.verifyAsync(createPassDto.token, {
        secret: config.get('JWT_SECRET_KEY'),
      });
    } catch (error) {
      console.log(error);
      ErrorHandler.unauthorized('Token verification failed');
    }

    if (user.id !== tokenPayload.uid) {
      ErrorHandler.unauthorized('Token uid no match with user email');
    }

    const isMatch = await bcrypt.compare(key, tokenPayload.key);

    if (!isMatch) {
      ErrorHandler.unauthorized('Token key failed');
    }

    return this.usersService.findByEmail(createPassDto.email);
  }

  async login(user: User) {
    const { id, email, name, fatherLastName, moderLastName, roles } = user;
    const payload = { id, email, name, fatherLastName, moderLastName, roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async resetPassword(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      ErrorHandler.notFoundEntry('User');
    }

    const apiKey = config.get(Constant.CREATE_PASS_KEY_NAME);
    const salt = await bcrypt.genSalt();
    const key = await bcrypt.hash(apiKey, salt);

    const resetPasswordToken = this.jwtService.sign(
      { uid: user.id, date: new Date(), key },
      { expiresIn: '24h' },
    );

    await this.usersService.update(user.id, { resetPasswordToken });
    this.sendEmailResetPassword(resetPasswordToken);
    return;
  }

  sendEmailResetPassword(resetPasswordToken: string) {
    console.log(resetPasswordToken);
  }
}
