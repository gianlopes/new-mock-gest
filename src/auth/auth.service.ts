import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Client } from '@prisma/client';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class AuthService {
  constructor(
    private clientService: ClientService,
    private jwtService: JwtService
  ) {}

  async validateClient(
    clientId: string,
    clientSecret: string
  ): Promise<Omit<Client, 'client_secret'> | undefined> {
    const client = await this.clientService.client({ client_id: clientId });
    // DON'T STORE PLAINTEXT PASSWORDS
    if (client && client.client_secret === clientSecret) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { client_secret, ...result } = client;
      return result;
    }
    return undefined;
  }

  async login(client: Omit<Client, 'client_secret'>) {
    const payload = { client_id: client.client_id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
