// TypeORM
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm';

// Model
import { Author } from '@/authors/author.entity';

@Entity({ name: 'Book' })
export class Book {

  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ name: 'Name' })
  name: string;

  @Column({
    name: 'Translator',
    nullable: true
  })
  translator: string;

  @Column({
    name: 'Category',
    nullable: true
  })
  category: string;

  @Column({ name: 'Language' })
  language: string;

  @Column({ name: 'PrintLength' })
  numberOfPages: number;

  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: "Author" })
  authorId: string;

  @Column({ name: 'Publisher' })
  publisher: string;

  @Column({ name: 'PublicationDate' })
  publicationDate: Date;

  @Column({
    name: 'IsTextToSpeech',
    default: false
  })
  textToSpeech: boolean;

  @Column({
    name: 'Price',
    nullable: true
  })
  price: number;

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt' })
  updatedAt: Date;

  @VersionColumn({ name: 'Version' })
  version: number;

}