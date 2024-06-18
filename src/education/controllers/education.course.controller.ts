import {
  ApiPaginatedResponse,
  PaginatedDto,
} from '@/common/constant/pagination.constant';
import { ApiOkResponseCustom } from '@/common/interceptors/transform.interceptor';
import {
  EducationCourseCreateDto,
  EducationCourseDeleteResponseDto,
  EducationCourseDto,
  EducationCourseGetAllParamsDto,
  EducationCoursesResponseDto,
  EducationCourseUpdateDto,
} from '@/education/dto/education.course.dto';
import { EducationCourseService } from '@/education/services/education.course.service';
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
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';

@ApiTags('education-course')
@Controller('education-course')
@ApiExtraModels(PaginatedDto)
export class EducationCourseController {
  constructor(
    private readonly educationCourseService: EducationCourseService,
  ) {}

  @ApiPaginatedResponse(EducationCourseDto)
  @Get('/')
  async findAll(
    @Query() query: EducationCourseGetAllParamsDto,
  ): Promise<EducationCoursesResponseDto> {
    return this.educationCourseService.findAll(query);
  }

  @Get('/:id')
  @ApiOkResponseCustom(EducationCourseDto, true)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<EducationCourseDto> {
    return this.educationCourseService.findOne(id);
  }

  @Post('/')
  @ApiOkResponseCustom(EducationCourseDto)
  async create(@Body() body: EducationCourseCreateDto) {
    return this.educationCourseService.create(body);
  }

  @Put('/:id')
  @ApiOkResponseCustom(EducationCourseDto)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: EducationCourseUpdateDto,
  ) {
    return this.educationCourseService.update(id, body);
  }

  @Delete('/:id')
  @ApiOkResponseCustom(EducationCourseDeleteResponseDto)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<EducationCourseDeleteResponseDto> {
    return this.educationCourseService.remove(id);
  }
}
