import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockUpdateType } from 'src/common/constants/constants';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ResourcesService } from 'src/common/resource.service';
import { UpdateStockDto } from 'src/stock/dto/update-stock.dto';
import { Stock } from 'src/stock/entities/stock.entity';
import { StockService } from 'src/stock/stock.service';
import { Connection, Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService extends ResourcesService {
  constructor(
    @InjectRepository(Product) productRepository: Repository<Product>,
    private connection: Connection,
    private stockService: StockService,
  ) {
    super(productRepository);
  }

  private async updateStock(
    product: Product,
    updateData: UpdateStockDto,
    stockUpdateType: StockUpdateType,
  ) {
    return await this.connection.transaction(async (manager) => {
      const balance =
        stockUpdateType === StockUpdateType.ADD
          ? product.currentStock + updateData.updateNumber
          : product.currentStock - updateData.updateNumber;

      const stockUpdate = new Stock();
      stockUpdate.description = updateData.description;
      stockUpdate.balanceBefore = product.currentStock;
      stockUpdate.product = product;
      stockUpdate.balanceAfter = balance;

      const editedProduct = new Product();
      Object.assign(editedProduct, {
        ...product,
        currentStock: stockUpdate.balanceAfter,
      });

      await manager.save(stockUpdate);
      await manager.save(editedProduct);

      return editedProduct;
    });
    // TODO : add user id
  }

  async increaseStock(productId: string, updateData: UpdateStockDto) {
    const product = await super.findOne(productId);
    return await this.updateStock(product, updateData, StockUpdateType.ADD);
  }

  async decreaseStock(productId: string, updateData: UpdateStockDto) {
    const product = await super.findOne(productId);
    return await this.updateStock(product, updateData, StockUpdateType.REMOVE);
  }

  async getStockHistory(productId: string, pagination?: PaginationQueryDto) {
    return await this.stockService.findByProductId(productId, pagination);
  }
}
