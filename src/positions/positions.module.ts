import { PositionsModel } from '@/positions/models/positions.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PositionsController } from './positions.controller';
import { PositionsService } from './positions.service';

@Module({
  controllers: [PositionsController],
  providers: [PositionsService],
  imports: [SequelizeModule.forFeature([PositionsModel])],
  exports: [SequelizeModule.forFeature([PositionsModel])],
})
export class PositionsModule {}
