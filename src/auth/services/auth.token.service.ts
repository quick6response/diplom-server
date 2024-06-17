import { AuthDataJwtPayload } from '@/common/interface/auth.interface';
import { ApplicationConfig } from '@config/application.config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthTokenService {
  constructor(private readonly jwtService: JwtService) {}

  createAccessToken(user: AuthDataJwtPayload) {
    const expiresDate = new Date();
    expiresDate.setSeconds(
      expiresDate.getSeconds() + ApplicationConfig.auth.assessTokenTime,
    );

    return {
      token: this.jwtService.sign(user),
      expiresDate: expiresDate,
    };
  }

  createRefreshToken(user: AuthDataJwtPayload) {
    const expiresDate = new Date(
      Date.now() + ApplicationConfig.auth.refreshTokenTime * 1000,
    );

    return {
      token: this.jwtService.sign(user, {
        expiresIn: ApplicationConfig.auth.refreshTokenTime,
      }),
      expiresDate: expiresDate,
    };
  }

  validateToken(token: string): boolean {
    try {
      this.jwtService.verify<AuthDataJwtPayload>(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  decodeToken(token: string): {
    data: AuthDataJwtPayload | null;
    ok: boolean;
  } {
    try {
      return {
        data: this.jwtService.decode<AuthDataJwtPayload>(token),
        ok: true,
      };
    } catch (error) {
      return { data: null, ok: false };
    }
  }
}
