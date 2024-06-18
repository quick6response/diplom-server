import { EducationProgramModel } from '@/education/models/education.program.model';
import { Position, PositionCreate } from '@/positions/interface/position';
import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'Positions' })
export class PositionsModel extends Model<Position, PositionCreate> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  code: string;

  @Column
  name: string;

  @Column
  description: string | null;

  createdAt: Date;
  updatedAt: Date;

  @HasMany(() => EducationProgramModel)
  educationPrograms: EducationProgramModel[];
}
