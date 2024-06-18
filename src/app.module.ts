import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthModule } from '@/auth/auth.module';
import { AuthTokenService } from '@/auth/services/auth.token.service';
import { AuthGuard } from '@/common/guards/auth.guard';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { EducationCourseController } from '@/education/controllers/education.course.controller';
import { EducationProgramController } from '@/education/controllers/education.program.controller';
import { EducationModule } from '@/education/education.module';
import { EducationCourseModel } from '@/education/models/education.course.model';
import { EducationProgramModel } from '@/education/models/education.program.model';
import { EducationCourseService } from '@/education/services/education.course.service';
import { EducationProgramService } from '@/education/services/education.program.service';

import { EmployeesModule } from '@/employees/employees.module';
import { PositionsModel } from '@/positions/models/positions.model';
import { UsersModel } from '@/users/models/users.model';
import { UsersController } from '@/users/users.controller';
import { UsersModule } from '@/users/users.module';
import { UsersService } from '@/users/users.service';
import { db } from '@config';
import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import type { Dialect } from 'sequelize';
import { PositionsModule } from './positions/positions.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: db.dialect as Dialect,
      host: db.host,
      port: db.port,
      username: db.user,
      password: db.password,
      database: db.database,
      models: [
        UsersModel,
        PositionsModel,
        EducationCourseModel,
        EducationProgramModel,
      ],
      autoLoadModels: true,
      logging: true,
      logQueryParameters: true,
      benchmark: true,
    }),
    UsersModule,
    AuthModule,
    EmployeesModule,
    JwtModule,
    PositionsModule,
    EducationModule,
  ],
  providers: [
    AppService,
    AuthTokenService,
    UsersService,
    EducationCourseService,
    EducationProgramService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
  controllers: [
    AppController,
    UsersController,
    EducationCourseController,
    EducationProgramController,
  ],
})
export class AppModule {}
