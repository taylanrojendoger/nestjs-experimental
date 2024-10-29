// NestJS
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { RedisModule } from 'src/redis/redis.module';

// Services
import { AuthorsService } from '@/authors/authors.service';

// DTOs & Entities
import { AuthorsController } from '@/authors/authors.controller';
import { Author } from '@/authors/author.entity';

@Module({
    imports: [
        RedisModule,
        TypeOrmModule.forFeature([Author])
    ],
    providers: [AuthorsService],
    exports: [AuthorsService],
    controllers: [AuthorsController]
})
export class AuthorsModule { }