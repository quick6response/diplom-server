import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidateErrorException extends HttpException {
  constructor(name: string, message: string) {
    super(`${name} — ${message}`, HttpStatus.BAD_REQUEST);
  }
}
