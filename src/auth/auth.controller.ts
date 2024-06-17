import { AuthLoginParamsDto } from '@/auth/dto/auth.dto';
import { AuthService } from '@/auth/services/auth.service';
import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: AuthLoginParamsDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const authLogin = await this.authService.login(body);
    await this.setAssessTokenCookie(
      res,
      authLogin.accessToken.token,
      authLogin.accessToken.time,
    );
    await this.setRefreshTokenCookie(
      res,
      authLogin.refreshToken.token,
      authLogin.refreshToken.time,
    );
    return authLogin;
  }

  @Post('logout')
  async logout() {}

  async setAssessTokenCookie(res: Response, token: string, expires: Date) {
    res.cookie('accessToken', token, {
      path: '/api',
      expires: expires,
    });

    console.log('setAssessTokenCookie', expires);
    return res;
  }

  async setRefreshTokenCookie(res: Response, token: string, expires: Date) {
    res.cookie('refreshToken', token, {
      path: '/api/auth',
      expires: expires,
    });

    console.log('setRefreshTokenCookie', expires);
    return res;
  }
}
