import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { SearchQueryDto } from 'src/common/dto/search-query.dto';
import { IBaseController } from 'src/common/interfaces/base-controller.interface';
import { UpdateStockDto } from 'src/stock/dto/update-stock.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController implements IBaseController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: CreateProductDto,
    isArray: true,
    description: 'Returns all products specified by pagination',
  })
  async findAll(
    @Query() pagination: PaginationQueryDto | SearchQueryDto | UpdateProductDto,
  ) {
    return this.productsService.findAll(pagination);
  }

  @ApiResponse({
    status: 200,
    type: CreateProductDto,
    isArray: true,
    description: 'Returns all products specified by search parameters',
  })
  @Get('search')
  async Search(@Query() queries: SearchProductDto): Promise<any> {
    return this.productsService.search(queries);
  }

  @ApiResponse({
    status: 200,
    type: CreateProductDto,
    description: 'Returns one product specified by id',
  })
  @Get(':id')
  async findOneById(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.productsService.findOne(id);
  }

  @Post()
  async create(@Body() data: CreateProductDto): Promise<any> {
    return this.productsService.create(data);
  }

  @Post(':id/increase')
  async addToStock(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateStockDto,
  ): Promise<any> {
    return this.productsService.create(data);
  }

  @Post(':id/decrease')
  async removeFromStock(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateStockDto,
  ): Promise<any> {
    return this.productsService.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateProductDto,
  ): Promise<any> {
    return this.productsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id?: any): Promise<any> {
    return this.productsService.remove(id);
  }
}
