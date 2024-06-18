import { PaginatedDto } from '@/common/constant/pagination.constant';
import { SortOrderConstant } from '@/common/constant/sort.constant';
import { Employee } from '@/employees/interface/employee';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class EmployeeDto
  implements Omit<Employee, 'passportNumber' | 'passportSerial'>
{
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  lastName: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  middleName: string;

  @IsString()
  @ApiProperty()
  login: string;

  @IsPhoneNumber('RU')
  @ApiProperty({
    example: '+79999999999',
  })
  numberPhone: string;

  @IsNumber()
  @ApiProperty({
    example: 123456,
  })
  passportNumber: number;

  @IsNumber()
  @ApiProperty({
    example: 1234,
  })
  passportSerial: number;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;
}

export class EmployeeGetAllParamsDto {
  @ApiProperty({
    required: false,
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsOptional()
  id?: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsOptional()
  page: number;

  @ApiProperty({
    required: false,
    enum: [
      'id',
      'lastName',
      'firstName',
      'middleName',
      'createdAt',
      'updatedAt',
    ],
  })
  @IsString()
  @IsOptional()
  orderBy: keyof Employee;

  @ApiProperty({
    enum: SortOrderConstant,
    required: false,
  })
  @IsEnum(SortOrderConstant)
  @IsOptional()
  order: SortOrderConstant;
}

export class EmployeeGetAllResponseDto extends PaginatedDto<EmployeeDto> {}

export class EmployeeCreatePositionsParamsDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  positionId: number;
}

export class EmployeeCreateParamsDto extends OmitType(EmployeeDto, [
  'id',
  'createdAt',
  'updatedAt',
] as const) {
  @ApiProperty({ isArray: true, type: EmployeeCreatePositionsParamsDto })
  @IsArray({ each: true })
  positions: EmployeeCreatePositionsParamsDto[];
}

export class EmployeeCreateResponseDto extends EmployeeDto {}

export class EmployeePositionInfoResponseDto {
  @ApiProperty()
  number: number;
  @ApiProperty({ example: '1' })
  name: string;
  @ApiProperty({ example: '1' })
  code: string;
  @ApiProperty({ example: 1 })
  id: number;
}

export class EmployeeInfoResponseDto extends EmployeeDto {
  @ApiProperty({ isArray: true, type: EmployeePositionInfoResponseDto })
  positions: EmployeePositionInfoResponseDto[];
}
