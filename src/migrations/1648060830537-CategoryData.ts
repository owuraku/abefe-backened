import { Category } from 'src/categories/entities/categories.entity';
import {
  EntityRepository,
  getRepository,
  MigrationInterface,
  QueryRunner,
} from 'typeorm';

export class CategoryData1648060830537 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categoryRepo = getRepository(Category);
    await categoryRepo.insert([
      {
        name: 'Provisions',
      },
      {
        name: 'Cold Store',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
