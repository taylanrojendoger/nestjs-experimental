// TypeORM
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm';

// Model
import { Book } from '@/books/book.entity';

@Entity({ name: 'Author' })
export class Author {

  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ name: 'Name' })
  name: string;

  @Column({ name: 'Nationality' })
  nationality: string;

  @Column({ name: 'Address' })
  birthdate: Date;

  @Column({
    name: 'Email',
    nullable: true
  })
  email: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt' })
  updatedAt: Date;

  @VersionColumn({ name: 'Version' })
  version: number;

}