import { Product } from 'src/products/entities/product.entity';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryProductsData1648061330699 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (process.env.ENV === 'development') {
      const productRepo = getRepository(Product);
      await productRepo.insert([
        {
          name: 'Ideal Milk Small',
          category: () => '1',
          costPrice: 4.99,
          sellingPrice: 6,
        },
        {
          name: 'Ideal Milk Large',
          category: () => '1',
          costPrice: 7.99,
          sellingPrice: 9,
        },
        {
          name: 'Peak Milk Small',
          category: () => '1',
          costPrice: 5.4,
          sellingPrice: 6,
        },
        {
          name: 'Peak Milk Large',
          category: () => '1',
          costPrice: 8.99,
          sellingPrice: 9.5,
        },
        {
          name: 'Milo Sachet small',
          category: () => '1',
          costPrice: 1.6,
          sellingPrice: 2,
        },
        {
          name: 'Nido Sachet',
          category: () => '1',
          costPrice: 1.5,
          sellingPrice: 2,
        },
        {
          name: 'Chicken Back',
          category: () => '2',
          costPrice: 8,
          sellingPrice: 9,
        },
        {
          name: 'Salmon 1kg',
          category: () => '2',
          costPrice: 9,
          sellingPrice: 11,
        },
        {
          name: 'Goat Meat',
          category: () => '2',
          costPrice: 11,
          sellingPrice: 15,
        },
        {
          name: 'Sausage',
          category: () => '2',
          costPrice: 5,
          sellingPrice: 7,
        },
      ]);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
