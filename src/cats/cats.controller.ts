import { Controller, Get, Post, Body, UsePipes, Param } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id) {
    return this.catsService.findOne(id);
  }
}
