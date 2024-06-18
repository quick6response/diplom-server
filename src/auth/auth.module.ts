import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/services/auth.service';
import { AuthTokenService } from '@/auth/services/auth.token.service';
import { UsersModel } from '@/users/models/users.model';
import { auth } from '@config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [AuthService, AuthTokenService],
  imports: [
    SequelizeModule.forFeature([UsersModel]),
    JwtModule.register({
      secret: auth.secret,
      signOptions: {
        expiresIn: auth.assessTokenTime,
        algorithm: 'HS256',
      },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
