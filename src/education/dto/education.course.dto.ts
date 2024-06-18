import { PaginatedDto } from '@/common/constant/pagination.constant';
import { SortOrderConstant } from '@/common/constant/sort.constant';
import { EducationCourse } from '@/education/interface/education.course.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class EducationCourseDto implements EducationCourse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class EducationCourseGetAllParamsDto {
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
    enum: ['id', 'code', 'name', 'createdAt', 'updatedAt'],
  })
  @IsString()
  @IsOptional()
  orderBy: keyof EducationCourse;

  @ApiProperty({
    enum: SortOrderConstant,
    required: false,
  })
  @IsEnum(SortOrderConstant)
  @IsOptional()
  order: SortOrderConstant;
}

export class EducationCourseCreateDto {
  @ApiProperty({ example: '101' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'Библиотекарь' })
  @IsString()
  name: string;
}

export class EducationCourseUpdateDto extends EducationCourseCreateDto {}

export class EducationCoursesResponseDto extends PaginatedDto<EducationCourseDto> {}

export interface EducationCourseCreateResponseDto {
  id: number;
  code: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class EducationCourseDeleteResponseDto {
  @ApiProperty({ example: true })
  ok: boolean;
}
