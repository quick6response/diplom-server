import { ApiOkResponseCustom } from '@/common/interceptors/transform.interceptor';
import { HomeStatsResponseDto } from '@/home/dto/home.dto';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('home')
@Controller('home')
export class HomeController {
  @Get('/stats')
  @ApiOkResponseCustom(HomeStatsResponseDto)
  async stats(): Promise<HomeStatsResponseDto> {
    return {
      countEducationEmployee: 0,
      totalEmployees: 0,
      totalPositions: 0,
    };
  }
}
