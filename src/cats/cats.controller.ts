import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { RolesGuard } from '../common/guards/roles.guard';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { Roles } from '../common/decorators/roles.decorator';
import { Cat } from './cat';

@Controller('cats')
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id): Promise<Cat | undefined> {
    return this.catsService.findOne(id);
  }
}
