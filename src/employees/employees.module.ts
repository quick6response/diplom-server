import { EmployeePositionsModel } from '@/employees/models/employee.positions.model';
import { EmployeesModel } from '@/employees/models/employees.model';
import { PositionsModel } from '@/positions/models/positions.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

@Module({
  providers: [EmployeesService],
  controllers: [EmployeesController],
  imports: [
    SequelizeModule.forFeature([
      PositionsModel,
      EmployeesModel,
      EmployeePositionsModel,
    ]),
  ],
  exports: [
    SequelizeModule.forFeature([
      PositionsModel,
      EmployeesModel,
      EmployeePositionsModel,
    ]),
  ],
})
export class EmployeesModule {}
