// TypeORM
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// Model
import { Author } from '@/authors/author.entity';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'Book' })
export class Book {

  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: number;

  @ApiProperty()
  @Column({ name: 'Name' })
  name: string;

  @ApiProperty()
  @Column({
    name: 'Translator',
    nullable: true
  })
  translator: string;

  @ApiProperty()
  @Column({
    name: 'Category',
    nullable: true
  })
  category: string;

  @ApiProperty()
  @Column({ name: 'Language' })
  language: string;

  @ApiProperty()
  @Column({ name: 'PrintLength' })
  numberOfPages: number;

  @ApiProperty()
  @Column({ name: 'AuthorName' })
  authorName: string;

  @ApiProperty()
  @Column({ name: 'AuthorId' })
  @ManyToOne(() => Author, (author) => author.books)
  authorId: string;

  @ApiProperty()
  @Column({ name: 'Publisher' })
  publisher: string;

  @ApiProperty()
  @Column({ name: 'PublicationDate' })
  publicationDate: Date;

  @ApiProperty()
  @Column({
    name: 'IsTextToSpeech',
    default: false
  })
  textToSpeech: boolean;

  @ApiProperty()
  @Column({
    name: 'Price',
    nullable: true
  })
  price: number;

}