import {
  EducationProgramCreateDto,
  EducationProgramGetPositionsResponseDto,
} from '@/education/dto/education.program.dto';
import { EducationProgramModel } from '@/education/models/education.program.model';
import { PositionsModel } from '@/positions/models/positions.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class EducationProgramService {
  constructor(
    @InjectModel(EducationProgramModel)
    private readonly educationProgramModel: typeof EducationProgramModel,
    @InjectModel(PositionsModel)
    private readonly positionModel: typeof PositionsModel,
  ) {}

  /**
   * Получить должности у которых есть программа обучения
   */
  async getPositionIsEducationProgram(): Promise<
    EducationProgramGetPositionsResponseDto[]
  > {
    const data = await this.positionModel.findAll({
      include: [
        {
          model: this.educationProgramModel,
          attributes: ['id'],
          required: true,
        },
      ],
    });

    return data.map(({ id, code, name, educationPrograms }) => ({
      code,
      name,
      countCourse: educationPrograms.length,
      id,
    }));
  }

  async createProgram(dto: EducationProgramCreateDto) {
    const bulkDataCreate = dto.courseIds.map((courseId) => ({
      positionId: dto.positionId,
      courseId,
    }));

    await this.educationProgramModel.bulkCreate(bulkDataCreate);

    return { id: dto.positionId };
  }

  async deleteProgram(positionId: number) {
    await this.educationProgramModel.destroy({ where: { positionId } });

    return { ok: true };
  }
}
