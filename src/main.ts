import { AppModule } from '@/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  const config = new DocumentBuilder()
    .setTitle('Система обучения сотрудников')
    .setDescription('Описание системы обучения сотрудников')
    .setVersion('1.0')
    .addApiKey({
      type: 'apiKey',
      name: 'Authorization',
      in: 'cookie',
    })
    .addTag('employee')

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
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
