import { AuthLoginParamsDto } from '@/auth/dto/auth.dto';
import { AuthService } from '@/auth/services/auth.service';
import { AuthTokenConstant } from '@/common/constant/auth.constant';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';

@ApiTags('auth')
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
      authLogin.accessToken.expires,
    );
    await this.setRefreshTokenCookie(
      res,
      authLogin.refreshToken.token,
      authLogin.refreshToken.expires,
    );
    return authLogin;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(AuthTokenConstant.ACCESS_TOKEN);
    res.clearCookie(AuthTokenConstant.REFRESH_TOKEN);

    return {
      ok: true,
    };
  }

  async setAssessTokenCookie(res: Response, token: string, expires: Date) {
    res.cookie(AuthTokenConstant.ACCESS_TOKEN, token, {
      path: '/api',
      expires: expires,
    });

    console.log('setAssessTokenCookie', expires);
    return res;
  }

  async setRefreshTokenCookie(res: Response, token: string, expires: Date) {
    res.cookie(AuthTokenConstant.REFRESH_TOKEN, token, {
      path: '/api/auth',
      expires: expires,
    });

    console.log('setRefreshTokenCookie', expires);
    return res;
  }
}
