import { AppModule } from '@/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as process from 'node:process';

async function bootstrap() {
  const applicationServerPort = process.env['API_PORT'] || 3010;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(applicationServerPort, () => {
    console.log(`Application is running on: ${applicationServerPort}`);
  });
}
bootstrap();
