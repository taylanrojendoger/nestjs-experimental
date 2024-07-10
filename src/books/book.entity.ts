// TypeORM
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  author: string;

  @ApiProperty()
  @Column()
  price: number;
}