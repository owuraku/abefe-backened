import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { IBaseController } from 'src/common/interfaces/base-controller.interface';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController implements IBaseController {
  constructor(readonly categoryService: CategoriesService) {}
  @Get()
  async findAll(@Query() pagination?: PaginationQueryDto) {
    return this.categoryService.findAll(pagination);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<any> {
    return this.categoryService.findOne(id);
  }

  @Get(':id/products')
  async findCategoryProducts(
    @Param('id') id: string,
    @Query() pagination?: PaginationQueryDto,
  ): Promise<any> {
    return this.categoryService.findProductsByCategoryId(id, pagination);
  }

  @Post()
  async create(@Body() data: CreateCategoryDto): Promise<any> {
    return this.categoryService.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateCategoryDto,
  ): Promise<any> {
    return this.categoryService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<any> {
    return this.categoryService.remove(id);
  }
}
