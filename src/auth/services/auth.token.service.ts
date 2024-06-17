import { ApplicationConfig } from '@config/application.config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../../users/interface/user';

export interface JwtPayload {
  id: number;
  role: UserRole;
  login: string;
}

@Injectable()
export class AuthTokenService {
  constructor(private readonly jwtService: JwtService) {}

  createAccessToken(user: JwtPayload) {
    const expiresDate = new Date();
    expiresDate.setSeconds(
      expiresDate.getSeconds() + ApplicationConfig.auth.assessTokenTime,
    );

    return {
      token: this.jwtService.sign(user),
      expiresDate: expiresDate,
    };
  }

  createRefreshToken(user: JwtPayload) {
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

  verifyToken(token: string) {
    return this.jwtService.verify<JwtPayload>(token);
  }

  decodeToken(token: string) {
    return this.jwtService.decode<JwtPayload>(token);
  }
}
