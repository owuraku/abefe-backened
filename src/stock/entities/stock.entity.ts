import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @Column()
  balanceBefore: number;

  @Column()
  balanceAfter: number;

  @Column({ default: 1 })
  updatedBy: number;

  @Column()
  createdAt: Date;
}
