import {
  EducationCourseCreateDto,
  EducationCourseGetAllParamsDto,
  EducationCourseUpdateDto,
} from '@/educationСourse/dto/education.course.dto';
import { EducationCourseService } from '@/educationСourse/education.course.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('education-course')
@Controller('education-course')
export class EducationCourseController {
  constructor(
    private readonly educationCourseService: EducationCourseService,
  ) {}

  @Get('/')
  async findAll(@Query() query: EducationCourseGetAllParamsDto) {
    return this.educationCourseService.findAll(query);
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.educationCourseService.findOne(id);
  }

  @Post('/')
  async create(@Body() body: EducationCourseCreateDto) {
    return this.educationCourseService.create(body);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: EducationCourseUpdateDto,
  ) {
    return this.educationCourseService.update(id, body);
  }

  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.educationCourseService.remove(id);
  }
}
