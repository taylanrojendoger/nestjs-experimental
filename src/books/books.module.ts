// NestJS
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Cache
import { RedisModule } from 'src/redis/redis.module';

// Services
import { BooksService } from '@/books/books.service';

// DTOs & Entities
import { BooksController } from '@/books/books.controller';
import { Book } from '@/books/book.entity';

@Module({
    imports: [
        RedisModule,
        TypeOrmModule.forFeature([Book])
    ],
    providers: [BooksService],
    controllers: [BooksController]
})
export class BooksModule { }