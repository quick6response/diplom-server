import { UsersModel } from '@/users/models/users.model';
import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([UsersModel])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [SequelizeModule.forFeature([UsersModel])],
})
export class UsersModule {}
