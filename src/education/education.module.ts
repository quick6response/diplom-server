import { EducationCourseController } from '@/education/controllers/education.course.controller';
import { EducationProgramController } from '@/education/controllers/education.program.controller';
import { EducationCourseModel } from '@/education/models/education.course.model';
import { EducationProgramModel } from '@/education/models/education.program.model';
import { EducationCourseService } from '@/education/services/education.course.service';
import { EducationProgramService } from '@/education/services/education.program.service';
import { PositionsModel } from '@/positions/models/positions.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [EducationCourseService, EducationProgramService],
  controllers: [EducationCourseController, EducationProgramController],
  imports: [
    SequelizeModule.forFeature([
      EducationCourseModel,
      PositionsModel,
      EducationProgramModel,
    ]),
  ],
  exports: [
    SequelizeModule.forFeature([
      EducationCourseModel,
      PositionsModel,
      EducationProgramModel,
    ]),
  ],
})
export class EducationModule {}
