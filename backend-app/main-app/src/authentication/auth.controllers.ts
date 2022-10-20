import { LoginAuthDto } from './dto/login.dto';
import { Body, Controller, Inject, Post } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTHENTICATION') private readonly authService: ClientProxy,
  ) {}

  @Post('/login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.send({ cmd: 'login' }, loginAuthDto);
  }
}
