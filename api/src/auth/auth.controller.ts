import {
  Body,
  Controller,
  ForbiddenException,
  Logger,
  Post,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInAuthDto } from './dto/sign-in-auth.dto';
import { IAuth } from './auth.interface';
import { IsPublic } from './is-public';

import * as bcrypt from 'bcrypt';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiBody({
    type: SignInAuthDto,
    description:
      'This is a seed example. If you not execute seed yet, use /seed endpoint to do it. After execute, use processed token to validate all another endpoints.',
    examples: {
      a: {
        summary: 'Default seed',
        description: 'Use this to access with seed user',
        value: {
          email: 'joaodasilva@gmail.com',
          password: '1234',
        },
      },
    },
  })
  @IsPublic()
  @Post()
  async signIn(@Body() authSignIn: SignInAuthDto): Promise<IAuth> {
    const user = await this.userService.findByEmail(authSignIn.email);

    if (!user) {
      this.logger.error(authSignIn);
      throw new ForbiddenException('User not found', {
        description: 'USER_NOT_FOUND',
      });
    }

    const passwordMatch = await bcrypt.compare(
      authSignIn.password,
      user.password,
    );

    if (!passwordMatch) {
      this.logger.error(authSignIn);
      throw new ForbiddenException('Incorrect password', {
        description: 'INCORRECT_PASSWORD',
      });
    }

    return {
      id: user.id,
      email: user.email,
      token: this.jwtService.sign({
        id: user.id,
        email: user.email,
      }),
    };
  }
}
