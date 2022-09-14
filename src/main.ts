import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  console.log(`Listening on port ${PORT}`);
  await app.listen(PORT);
}

// eslint-disable-next-line unicorn/prefer-top-level-await, @typescript-eslint/no-floating-promises
bootstrap();
