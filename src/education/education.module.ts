import { EducationCourseController } from '@/education/controllers/education.course.controller';
import { EducationCourseModel } from '@/education/models/education.course.model';
import { EducationCourseService } from '@/education/services/education.course.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [EducationCourseService],
  controllers: [EducationCourseController],
  imports: [SequelizeModule.forFeature([EducationCourseModel])],
  exports: [SequelizeModule.forFeature([EducationCourseModel])],
})
export class EducationModule {}
