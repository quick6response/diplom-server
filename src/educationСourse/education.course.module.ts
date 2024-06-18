import { EducationCourseModel } from '@/educationСourse/models/education.course.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EducationCourseController } from './education.course.controller';
import { EducationCourseService } from './education.course.service';

@Module({
  providers: [EducationCourseService],
  controllers: [EducationCourseController],
  imports: [SequelizeModule.forFeature([EducationCourseModel])],
  exports: [SequelizeModule.forFeature([EducationCourseModel])],
})
export class EducationCourseModule {}
