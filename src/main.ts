import { AppModule } from '@/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as process from 'node:process';

declare global {
  namespace Express {
    export interface Request {
      decodeAuthUserData: any;
    }
  }
}

async function bootstrap() {
  const applicationServerPort = process.env['API_PORT'] || 3010;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors({
    origin: true,
    credentials: true,
  });
  await app.listen(applicationServerPort, () => {
    console.log(`Application is running on: ${applicationServerPort}`);
  });
}
bootstrap();
