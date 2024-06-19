import { ApiOkResponseCustom } from '@/common/interceptors/transform.interceptor';
import {
  EducationProgramCreateDto,
  EducationProgramCreateResponseDto,
  EducationProgramGetPositionsResponseDto,
} from '@/education/dto/education.program.dto';
import { EducationProgramService } from '@/education/services/education.program.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('education-program')
@Controller('education-program')
export class EducationProgramController {
  constructor(
    private readonly educationProgramService: EducationProgramService,
  ) {}

  @Get('/')
  @ApiOkResponseCustom(EducationProgramGetPositionsResponseDto, true)
  async findPositions(): Promise<EducationProgramGetPositionsResponseDto[]> {
    return this.educationProgramService.getPositionIsEducationProgram();
  }

  @Post('/')
  @ApiOkResponseCustom(EducationProgramCreateResponseDto)
  async createProgram(
    @Body() dto: EducationProgramCreateDto,
  ): Promise<EducationProgramCreateResponseDto> {
    return this.educationProgramService.createProgram(dto);
  }
}
