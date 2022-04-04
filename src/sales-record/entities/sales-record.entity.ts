import { Category } from 'src/categories/entities/categories.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class SalesRecord {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  name: string;

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn()
  category: Category;

  @Column({ default: 0.1, type: 'numeric' })
  sellingPrice: number;

  @Column({ default: 0.1, type: 'numeric' })
  costPrice: number;

  @Column({ default: 1 })
  currentStock: number;

  @Column({ default: true })
  status: boolean;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
