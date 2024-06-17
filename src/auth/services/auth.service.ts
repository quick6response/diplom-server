import { AuthLoginParamsDto, AuthLoginResponseDto } from '@/auth/dto/auth.dto';
import { AuthTokenService } from '@/auth/services/auth.token.service';
import { UsersModel } from '@/users/models/users.model';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UsersModel) private readonly userModel: typeof UsersModel,
    private readonly authTokenService: AuthTokenService,
  ) {}

  async login(dto: AuthLoginParamsDto): Promise<AuthLoginResponseDto> {
    const user = await this.userModel.findOne({
      where: { login: dto.login, password: dto.password },
    });
    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }
    const { accessToken, refreshToken } = this.generateToken(user);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        role: user.role,
      },
    };
  }

  generateToken(user: UsersModel): {
    accessToken: ReturnType<AuthTokenService['createAccessToken']>;
    refreshToken: ReturnType<AuthTokenService['createAccessToken']>;
  } {
    return {
      accessToken: this.authTokenService.createAccessToken({
        id: user.id,
        role: user.role,
        login: user.login,
      }),
      refreshToken: this.authTokenService.createRefreshToken({
        id: user.id,
        role: user.role,
        login: user.login,
      }),
    };
  }
}
