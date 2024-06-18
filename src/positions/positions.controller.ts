import {
  PositionCreateDto,
  PositionGetAllParamsDto,
} from '@/positions/dto/position.dto';
import { PositionsService } from '@/positions/positions.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('positions')
@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get('/')
  async findAll(@Query() query: PositionGetAllParamsDto) {
    return this.positionsService.findAll(query);
  }

  async findOne() {}

  @Post('/')
  async create(@Body() body: PositionCreateDto) {
    return this.positionsService.create(body);
  }

  async update() {}

  async remove() {}
}
