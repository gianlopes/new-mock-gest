import { repl } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const replServer = await repl(AppModule);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  replServer.context.prisma = replServer.context.get(
    PrismaService
  ) as PrismaService;
}

// eslint-disable-next-line unicorn/prefer-top-level-await, @typescript-eslint/no-floating-promises
bootstrap();
