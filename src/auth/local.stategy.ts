import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Client } from '@prisma/client';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'client_id', passwordField: 'client_secret' });
  }

  async validate(
    clientId: string,
    clientSecret: string
  ): Promise<Omit<Client, 'client_secret'>> {
    const client = await this.authService.validateClient(
      clientId,
      clientSecret
    );
    if (!client) {
      throw new UnauthorizedException();
    }
    return client;
  }
}
