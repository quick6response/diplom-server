import {
  EducationCourse,
  EducationCourseCreate,
} from '@/education/interface/education.course.interface';
import { EducationProgramModel } from '@/education/models/education.program.model';
import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'EducationCourses',
})
export class EducationCourseModel extends Model<
  EducationCourse,
  EducationCourseCreate
> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  code: string;

  @Column
  name: string;

  createdAt: Date;
  updatedAt: Date;

  @HasMany(() => EducationProgramModel)
  educationPrograms: EducationProgramModel[];
}
