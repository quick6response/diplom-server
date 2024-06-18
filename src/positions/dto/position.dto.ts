import { SortOrderConstant } from '@/common/constant/sort.constant';
import { Position } from '@/positions/interface/position';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class PositionGetAllParamsDto {
  @ApiProperty({
    required: false,
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsOptional()
  id?: number;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  code?: string;

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
    enum: ['id', 'code', 'name', 'description', 'createdAt', 'updatedAt'],
  })
  @IsString()
  @IsOptional()
  orderBy: keyof Position;

  @ApiProperty({
    enum: SortOrderConstant,
    required: false,
  })
  @IsEnum(SortOrderConstant)
  @IsOptional()
  order: SortOrderConstant;
}

export class PositionCreateDto {
  @ApiProperty({ example: '101' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'Специалист' })
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
}

export interface PositionsResponseDto {
  count: number;
  rows: Position[];
  nextPage: number | null;
  prevPage: number;
}

export interface PositionCreateResponseDto {
  id: number;
  code: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
