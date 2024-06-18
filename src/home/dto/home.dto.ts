import { ApiProperty } from '@nestjs/swagger';

export class HomeStatsResponseDto {
  @ApiProperty()
  totalEmployees: number;
  @ApiProperty()
  totalPositions: number;
  @ApiProperty()
  countEducationEmployee: number;
}
