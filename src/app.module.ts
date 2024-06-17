import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthModule } from '@/auth/auth.module';
import { AuthTokenService } from '@/auth/services/auth.token.service';
import { AuthGuard } from '@/common/guards/auth.guard';
import { EducationModule } from '@/education/education.module';
import { EmployeesModule } from '@/employees/employees.module';
import { UsersModel } from '@/users/models/users.model';
import { UsersController } from '@/users/users.controller';
import { UsersModule } from '@/users/users.module';
import { UsersService } from '@/users/users.service';
import { ApplicationConfig } from '@config/application.config';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import type { Dialect } from 'sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: ApplicationConfig.db.dialect as Dialect,
      host: ApplicationConfig.db.host,
      port: ApplicationConfig.db.port,
      username: ApplicationConfig.db.user,
      password: ApplicationConfig.db.password,
      database: ApplicationConfig.db.database,
      models: [UsersModel],
      autoLoadModels: true,
      synchronize: true,
      logging: true,
      logQueryParameters: true,
      benchmark: true,
    }),
    UsersModule,
    AuthModule,
    EmployeesModule,
    EducationModule,
    JwtModule,
  ],
  providers: [
    AppService,
    AuthTokenService,
    UsersService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AppController, UsersController],
})
export class AppModule {}
