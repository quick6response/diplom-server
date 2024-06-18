import {
  getNextPage,
  getPagination,
} from '@/common/constant/pagination.constant';
import { SortOrderConstant } from '@/common/constant/sort.constant';
import {
  EducationCourseCreateDto,
  EducationCourseCreateResponseDto,
  EducationCourseGetAllParamsDto,
  EducationCoursesResponseDto,
  EducationCourseUpdateDto,
} from '@/education/dto/education.course.dto';
import { EducationCourseModel } from '@/education/models/education.course.model';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WhereOptions } from 'sequelize';

const LIMIT_COUNT = 25;

@Injectable()
export class EducationCourseService {
  constructor(
    @InjectModel(EducationCourseModel)
    private readonly educationCourseModel: typeof EducationCourseModel,
  ) {}

  async create(
    dto: EducationCourseCreateDto,
  ): Promise<EducationCourseCreateResponseDto> {
    const duplicateCode = await this.educationCourseModel.findOne({
      where: {
        code: dto.code,
      },
    });

    if (duplicateCode) {
      throw new BadRequestException('Такая специальность уже существует');
    }

    try {
      const create = await this.educationCourseModel.create(dto);

      return {
        id: create.id,
        code: create.code,
        name: create.name,
        createdAt: create.createdAt,
        updatedAt: create.updatedAt,
      };
    } catch (err) {
      throw new BadRequestException(`Ошибка создания специальности: ${err}`);
    }
  }

  async findAll(
    dto: EducationCourseGetAllParamsDto,
  ): Promise<EducationCoursesResponseDto> {
    if (!dto.page) {
      dto.page = 1;
    }
    const { limit, offset } = getPagination({
      page: dto.page,
      count: LIMIT_COUNT,
    });
    const where: WhereOptions<any> = {};
    let orderBy = 'id';
    let order = SortOrderConstant.ASC;

    if (dto.orderBy) {
      orderBy = dto.orderBy;
    }
    if (dto.order) {
      order = dto.order;
    }

    if (dto.id) {
      where.id = dto.id;
    }

    if (dto.code) {
      where.code = dto.code;
    }

    if (dto.name) {
      where.name = dto.name;
    }

    const positions = await this.educationCourseModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [[orderBy, order]],
    });

    const { nextPage, prevPage } = getNextPage(
      {
        page: dto.page,
        count: LIMIT_COUNT,
      },
      positions,
    );

    return {
      count: positions.count,
      rows: positions.rows,
      nextPage,
      prevPage,
    };
  }

  async update(id: number, dto: EducationCourseUpdateDto) {
    const positionById = await this.educationCourseModel.findOne({
      where: {
        id,
      },
    });

    if (!positionById) {
      throw new NotFoundException('Такой темы обучения не существует');
    }

    if (dto.code !== positionById.code) {
      const duplicateCode = await this.educationCourseModel.findOne({
        where: {
          code: dto.code,
        },
      });
      if (duplicateCode) {
        throw new BadRequestException('Такая тема обучения уже существует');
      }
    }

    await positionById.update(dto);

    return {
      id: positionById.id,
      code: positionById.code,
      name: positionById.name,
      createdAt: positionById.createdAt,
      updatedAt: positionById.updatedAt,
    };
  }

  async remove(id: number) {
    const positionById = await this.educationCourseModel.findOne({
      where: {
        id,
      },
    });
    if (!positionById) {
      throw new NotFoundException('Такой темы обучения не существует');
    }
    await positionById.destroy();

    return {
      ok: true,
    };
  }

  async findOne(id: number) {
    const positionById = await this.educationCourseModel.findOne({
      where: {
        id,
      },
    });
    if (!positionById) {
      throw new NotFoundException('Такой темы обучения не существует');
    }
    return {
      id: positionById.id,
      code: positionById.code,
      name: positionById.name,
      createdAt: positionById.createdAt,
      updatedAt: positionById.updatedAt,
    };
  }
}
