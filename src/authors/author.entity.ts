// TypeORM
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @JoinColumn({ name: 'Books' })
  @OneToMany(() => Book, (book) => book.authorId)
  books: Book[];

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt' })
  updatedAt: Date;

  @VersionColumn({ name: 'Version' })
  version: number;

}