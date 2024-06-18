import {
  getNextPage,
  getPagination,
} from '@/common/constant/pagination.constant';
import { SortOrderConstant } from '@/common/constant/sort.constant';
import {
  EmployeeCreateParamsDto,
  EmployeeCreateResponseDto,
  EmployeeGetAllParamsDto,
  EmployeeGetAllResponseDto,
  EmployeeInfoResponseDto,
} from '@/employees/dto/employee.dto';
import { EmployeePositionsModel } from '@/employees/models/employee.positions.model';
import { EmployeesModel } from '@/employees/models/employees.model';
import { PositionsModel } from '@/positions/models/positions.model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, WhereOptions } from 'sequelize';

const LIMIT_COUNT = 25;

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(EmployeesModel)
    private readonly employeeModel: typeof EmployeesModel,
    @InjectModel(EmployeePositionsModel)
    private readonly employeePositionsModel: typeof EmployeePositionsModel,
  ) {}

  async findAll(
    dto: EmployeeGetAllParamsDto,
  ): Promise<EmployeeGetAllResponseDto> {
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

    const positions = await this.employeeModel.findAndCountAll({
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
      total: positions.count,
      results: positions.rows,
      nextPage,
      prevPage,
      limit,
      offset,
    };
  }

  async create(
    dto: EmployeeCreateParamsDto,
  ): Promise<EmployeeCreateResponseDto> {
    if (dto.positions.length < 1) {
      throw new BadRequestException({
        type: 'invalid-positions',
        message: 'Необходимо выбрать хотя бы одну должность',
      });
    }

    const findDuplicateByNumberPhoneOrPassport =
      await this.employeeModel.findOne({
        where: {
          [Op.or]: [
            { numberPhone: dto.numberPhone },
            {
              passportNumber: dto.passportNumber,
              passportSerial: dto.passportSerial,
            },
          ],
        },
      });

    if (findDuplicateByNumberPhoneOrPassport) {
      throw new BadRequestException({
        type: 'invalid-employee-unique-data',
        message: 'Такой номер телефона или паспорт уже существует',
      });
    }

    const transaction = await this.employeeModel.sequelize.transaction();

    try {
      const generateLogin = await this.generateRandomLogin();
      const createEmployee = await this.employeeModel.create(
        {
          firstName: dto.firstName,
          lastName: dto.lastName,
          middleName: dto.middleName,
          login: generateLogin,
          numberPhone: dto.numberPhone,
          passportSerial: dto.passportSerial,
          passportNumber: dto.passportNumber,
        },
        {
          transaction,
        },
      );

      const data = dto.positions.map((position, index) => ({
        employeeId: createEmployee.id,
        positionId: position.positionId,
        number: index + 1,
      }));

      await this.employeePositionsModel.bulkCreate(data, {
        transaction,
      });

      await transaction.commit();

      return {
        id: createEmployee.id,
        firstName: createEmployee.firstName,
        lastName: createEmployee.lastName,
        middleName: createEmployee.middleName,
        login: createEmployee.login,
        numberPhone: createEmployee.numberPhone,
        passportSerial: createEmployee.passportSerial,
        passportNumber: createEmployee.passportNumber,
        createdAt: createEmployee.createdAt,
        updatedAt: createEmployee.updatedAt,
      };
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      throw new BadRequestException(`Ошибка создания сотрудника: ${err}`);
    }
  }

  async getInfo(id: number): Promise<EmployeeInfoResponseDto> {
    const employee = await this.employeeModel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: EmployeePositionsModel,
          as: 'positions',
          include: [
            {
              model: PositionsModel,
              as: 'position',
            },
          ],
        },
      ],
    });

    if (!employee) {
      throw new BadRequestException({
        type: 'not-found-employee',
        message: 'Сотрудник не найден',
      });
    }

    const responsePosition: EmployeeInfoResponseDto['positions'] =
      employee.positions.map((position) => ({
        id: position.position.id,
        name: position.position.name,
        number: position.number,
        code: position.position.code,
      }));

    return {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      middleName: employee.middleName,
      login: employee.login,
      numberPhone: employee.numberPhone,
      passportSerial: employee.passportSerial,
      passportNumber: employee.passportNumber,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
      positions: responsePosition,
    };
  }

  private async generateRandomLogin() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const loginLength = Math.floor(Math.random() * (10 - 6 + 1)) + 6; // Генерация случайной длины логина от 6 до 10 символов
    let login = '';
    for (let i = 0; i < loginLength; i++) {
      login += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return login;
  }
}
