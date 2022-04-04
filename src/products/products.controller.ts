import {
  BadRequestException,
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
import { GENERIC_ERROR_MESSAGE } from 'src/common/constants/error-messages.constants';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { IBaseController } from 'src/common/interfaces/base-controller.interface';
import { UpdateStockDto } from 'src/stock/dto/update-stock.dto';
import { Stock } from 'src/stock/entities/stock.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController implements IBaseController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: Product,
    isArray: true,
    description: 'Returns all products specified by pagination',
  })
  async findAll(@Query() pagination: PaginationQueryDto) {
    return this.productsService.findAll(pagination);
  }

  @ApiResponse({
    status: 200,
    type: Product,
    isArray: true,
    description: 'Returns all products specified by search parameters',
  })
  @Get('search')
  async Search(@Query() queries: SearchProductDto): Promise<any> {
    return this.productsService.search(queries);
  }

  @ApiResponse({
    status: 200,
    type: Product,
    description: 'Returns one product specified by id',
  })
  @Get(':id')
  async findOneById(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.productsService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    type: Stock,
    description: 'Returns stock history of one product',
    isArray: true,
  })
  @Get(':id/history')
  async getStockHistory(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() paginator: PaginationQueryDto,
  ): Promise<any> {
    return this.productsService.getStockHistory(id, paginator);
  }

  @ApiResponse({
    status: 200,
    type: CreateProductDto,
    description: 'Creates and returns product specified by id',
  })
  @Post()
  async create(@Body() data: CreateProductDto): Promise<any> {
    return this.productsService.create(data);
  }

  @Post(':id/increase')
  async addToStock(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateStockDto,
  ): Promise<any> {
    return this.productsService.increaseStock(id, data).catch((e) => {
      throw new BadRequestException(GENERIC_ERROR_MESSAGE);
    });
  }

  @Post(':id/decrease')
  async removeFromStock(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateStockDto,
  ): Promise<any> {
    return this.productsService.decreaseStock(id, data).catch((e) => {
      throw new BadRequestException(GENERIC_ERROR_MESSAGE);
    });
  }

  @ApiResponse({
    status: 200,
    type: CreateProductDto,
    description: 'Updates and returns a product ',
  })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateProductDto,
  ): Promise<any> {
    return this.productsService.update(id, data);
  }

  @ApiResponse({
    status: 200,
    description: 'Delete a specified product ',
  })
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id?: any): Promise<any> {
    return this.productsService.remove(id);
  }
}
