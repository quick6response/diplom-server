import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();
    const message: ErrorPipes = exception.getResponse() as ErrorPipes;
    response.send({
      statusCode: status,
      message: message.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

type ErrorPipes = {
  status: number;
  message: string;
};
