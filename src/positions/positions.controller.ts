import {
  PositionCreateDto,
  PositionGetAllParamsDto,
  PositionUpdateDto,
} from '@/positions/dto/position.dto';
import { PositionsService } from '@/positions/positions.service';
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

@ApiTags('positions')
@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get('/')
  async findAll(@Query() query: PositionGetAllParamsDto) {
    return this.positionsService.findAll(query);
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.positionsService.findOne(id);
  }

  @Post('/')
  async create(@Body() body: PositionCreateDto) {
    return this.positionsService.create(body);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PositionUpdateDto,
  ) {
    return this.positionsService.update(id, body);
  }

  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.positionsService.remove(id);
  }
}
