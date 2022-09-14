import { Request } from 'express';
import { Client } from '@prisma/client';
import { Controller, Req, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('oauth2/token')
  async login(@Req() request: Request) {
    return this.authService.login(
      request.user as Omit<Client, 'client_secret'>
    );
  }
}
