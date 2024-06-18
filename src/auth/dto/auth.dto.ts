import { User } from '@/users/interface/user';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthLoginParamsDto {
  @ApiProperty({
    example: 'admin',
  })
  @IsString({ message: 'Логин - должен быть строкой' })
  login: string;

  @ApiProperty({
    example: 'admin',
  })
  @IsString({ message: 'Пароль - должен быть строкой' })
  password: string;
}

export class AuthLoginResponseDto {
  accessToken: {
    token: string;
    expires: Date;
  };
  refreshToken: {
    token: string;
    expires: Date;
  };
  user: {
    id: User['id'];
    firstName: User['firstName'];
    lastName: User['lastName'];
    middleName: User['middleName'];
    role: User['role'];
  };
}
