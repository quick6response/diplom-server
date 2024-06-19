import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class EducationProgramCreateDto {
  @ApiProperty({
    example: 1,
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  positionId: number;

  @ApiProperty({
    isArray: true,
    example: [1, 2, 3],
    items: {
      type: 'array',
      example: 1,
    },
  })
  @IsArray()
  courseIds: number[];
}

export class EducationProgramGetPositionsResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  countCourse: number;
}

export class EducationProgramCreateResponseDto {
  @ApiProperty()
  id: number;
}
