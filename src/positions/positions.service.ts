import {
  getNextPage,
  getPagination,
} from '@/common/constant/pagination.constant';
import { SortOrderConstant } from '@/common/constant/sort.constant';
import {
  PositionCreateDto,
  PositionCreateResponseDto,
  PositionGetAllParamsDto,
  PositionsResponseDto,
  PositionUpdateDto,
} from '@/positions/dto/position.dto';
import { PositionsModel } from '@/positions/models/positions.model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WhereOptions } from 'sequelize';

const LIMIT_COUNT = 25;

@Injectable()
export class PositionsService {
  constructor(
    @InjectModel(PositionsModel)
    private readonly positionsModel: typeof PositionsModel,
  ) {}

  async create(dto: PositionCreateDto): Promise<PositionCreateResponseDto> {
    const duplicateCode = await this.positionsModel.findOne({
      where: {
        code: dto.code,
      },
    });

    if (duplicateCode) {
      throw new BadRequestException('Такая специальность уже существует');
    }

    try {
      const create = await this.positionsModel.create(dto);

      return {
        id: create.id,
        code: create.code,
        name: create.name,
        description: create.description,
        createdAt: create.createdAt,
        updatedAt: create.updatedAt,
      };
    } catch (err) {
      throw new BadRequestException(`Ошибка создания специальности: ${err}`);
    }
  }

  async findAll(dto: PositionGetAllParamsDto): Promise<PositionsResponseDto> {
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

    const positions = await this.positionsModel.findAndCountAll({
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

  async update(id: number, dto: PositionUpdateDto) {
    const positionById = await this.positionsModel.findOne({
      where: {
        id,
      },
    });

    if (!positionById) {
      throw new BadRequestException('Такой специальности не существует');
    }

    if (dto.code !== positionById.code) {
      const duplicateCode = await this.positionsModel.findOne({
        where: {
          code: dto.code,
        },
      });
      if (duplicateCode) {
        throw new BadRequestException('Такая специальность уже существует');
      }
    }

    await positionById.update(dto);

    return {
      id: positionById.id,
      code: positionById.code,
      name: positionById.name,
      description: positionById.description,
      createdAt: positionById.createdAt,
      updatedAt: positionById.updatedAt,
    };
  }

  async remove(id: number) {
    const positionById = await this.positionsModel.findOne({
      where: {
        id,
      },
    });
    if (!positionById) {
      throw new BadRequestException('Такой специальности не существует');
    }
    await positionById.destroy();

    return {
      ok: true,
    };
  }
}
