import { Employee, EmployeeCreate } from '@/employees/interface/employee';
import { EmployeePositionsModel } from '@/employees/models/employee.positions.model';
import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'Employees',
})
export class EmployeesModel extends Model<Employee, EmployeeCreate> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  middleName: string;

  @Column
  login: string;

  @Column
  numberPhone: string;

  @Column
  passportSerial: number;

  @Column
  passportNumber: number;

  createdAt: Date;
  updatedAt: Date;

  @HasMany(() => EmployeePositionsModel)
  positions: EmployeePositionsModel[];
}
