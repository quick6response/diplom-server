import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { User, UserCreate, UserRole } from '../interface/user';

@Table({
  tableName: 'Users',
  modelName: 'Users',
  createdAt: true,
  updatedAt: true,
})
export class UsersModel extends Model<User, UserCreate> {
  @AutoIncrement
  @PrimaryKey
  @Unique
  @Column
  @Column(DataType.INTEGER)
  id: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @AllowNull
  @Column
  middleName: string | null;

  @Unique
  @Column
  login: string;

  @Column
  password: string;

  @Default(UserRole.MANAGER_PERSONAL)
  @Column(DataType.STRING)
  role: UserRole;
}
