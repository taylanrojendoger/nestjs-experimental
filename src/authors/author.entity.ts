// TypeORM
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// Model
import { Book } from '@/books/book.entity';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'Author' })
export class Author {

  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: number;

  @ApiProperty()
  @Column({ name: 'Name' })
  name: string;

  @ApiProperty()
  @Column({ name: 'Nationality' })
  nationality: string;

  @ApiProperty()
  @Column({ name: 'Address' })
  birthdate: Date;

  @ApiProperty()
  @Column({
    name: 'Email',
    nullable: true
  })
  email: string;

  @ApiProperty()
  @Column("text", { name: 'Book', array: true })
  @OneToMany(() => Book, (book) => book.authorId)
  books: Book[];

}