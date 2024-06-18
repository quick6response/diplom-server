import {
  EmployeePosition,
  EmployeePositionCreate,
} from '@/employees/interface/employee.position';
import { EmployeesModel } from '@/employees/models/employees.model';
import { PositionsModel } from '@/positions/models/positions.model';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'EmployeePositions',
})
export class EmployeePositionsModel extends Model<
  EmployeePosition,
  EmployeePositionCreate
> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  status: string;

  @Column
  number: number;

  @ForeignKey(() => EmployeesModel)
  @Column
  employeeId: number;

  @BelongsTo(() => EmployeesModel)
  employee: EmployeesModel;

  @ForeignKey(() => PositionsModel)
  @Column
  positionId: number;

  @BelongsTo(() => PositionsModel)
  position: PositionsModel;

  createdAt: Date;
  updatedAt: Date;
}
