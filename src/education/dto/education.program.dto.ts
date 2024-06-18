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
  })
  @IsArray()
  courseIds: number[];
}
