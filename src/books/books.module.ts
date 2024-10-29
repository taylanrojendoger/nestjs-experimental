// NestJS
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { AuthorsModule } from '@/authors/authors.module';
import { RedisModule } from 'src/redis/redis.module';

// Services
import { BooksService } from '@/books/books.service';

// DTOs & Entities
import { BooksController } from '@/books/books.controller';
import { Book } from '@/books/book.entity';

@Module({
    imports: [
        AuthorsModule,
        RedisModule,
        TypeOrmModule.forFeature([Book])
    ],
    providers: [BooksService],
    controllers: [BooksController]
})
export class BooksModule { }