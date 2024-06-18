import {
  EducationCourse,
  EducationCourseCreate,
} from '@/education/interface/education.course.interface';
import {
  AutoIncrement,
  Column,
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
}
