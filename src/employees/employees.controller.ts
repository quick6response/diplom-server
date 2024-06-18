import { ApiPaginatedResponse } from '@/common/constant/pagination.constant';
import { ApiOkResponseCustom } from '@/common/interceptors/transform.interceptor';
import {
  EmployeeCreateParamsDto,
  EmployeeCreateResponseDto,
  EmployeeDto,
  EmployeeGetAllParamsDto,
  EmployeeGetAllResponseDto,
} from '@/employees/dto/employee.dto';
import { EmployeesService } from '@/employees/employees.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get('/')
  @ApiPaginatedResponse(EmployeeDto)
  async findAll(
    @Query() query: EmployeeGetAllParamsDto,
  ): Promise<EmployeeGetAllResponseDto> {
    return await this.employeesService.findAll(query);
  }

  @Post('/')
  @ApiOkResponseCustom(EmployeeCreateResponseDto)
  async create(
    @Body() body: EmployeeCreateParamsDto,
  ): Promise<EmployeeCreateResponseDto> {
    return this.employeesService.create(body);
  }
}
