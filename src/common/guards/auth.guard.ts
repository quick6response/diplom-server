import { AuthTokenService } from '@/auth/services/auth.token.service';
import { AuthTokenConstant } from '@/common/constant/auth.constant';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authTokenService: AuthTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();
      if (
        request.path === '/api/auth/login' ||
        request.path === '/api/auth/logout'
      ) {
        return true;
      }
      const authorization: string =
        request.cookies[AuthTokenConstant.ACCESS_TOKEN];

      if (!authorization || authorization.trim() === '') {
        throw new ForbiddenException('Please provide token');
      }

      const resp = this.authTokenService.decodeToken(authorization);
      if (!resp.ok) {
        return false;
      }
      request.decodeAuthUserData = resp.data;
      // if (!authorization || authorization.trim() === '') {
      //   throw new UnauthorizedException('Please provide token');
      // }
      // const resp = this.authTokenService.validateToken(authToken);
      // request.decodedData = resp;
      return true;
    } catch (error) {
      console.log('auth error - ', error.message);
      throw new ForbiddenException(
        error.message || 'session expired! Please sign In',
      );
    }
  }
}
