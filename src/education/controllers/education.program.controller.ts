import { EducationProgramCreateDto } from '@/education/dto/education.program.dto';
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
  async findPositions() {
    return this.educationProgramService.getPositionIsEducationProgram();
  }

  @Post('/')
  async createProgram(@Body() dto: EducationProgramCreateDto) {
    return this.educationProgramService.createProgram(dto);
  }
}
