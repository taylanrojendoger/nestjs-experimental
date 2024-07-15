// NestJS
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { AuthorsService } from '@/authors/authors.service';

// DTOs & Entities
import { AuthorsController } from '@/authors/authors.controller';
import { Author } from '@/authors/author.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Author])],
    providers: [AuthorsService],
    controllers: [AuthorsController],
    //exports: [TypeOrmModule] // If Repository will be used outside of this module
})
export class AuthorsModule { }