import { EducationCourseModel } from '@/education/models/education.course.model';
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
  tableName: 'EducationPrograms',
})
export class EducationProgramModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => PositionsModel)
  @Column
  positionId: number;

  @BelongsTo(() => PositionsModel)
  position: PositionsModel;

  levelId: number;

  @ForeignKey(() => EducationCourseModel)
  @Column
  courseId: number;

  @BelongsTo(() => EducationCourseModel)
  course: EducationCourseModel;

  createdAt: Date;
  updatedAt: Date;
}
