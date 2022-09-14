import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Please use the /oauth2/token endpoint to get a token.';
  }
}
