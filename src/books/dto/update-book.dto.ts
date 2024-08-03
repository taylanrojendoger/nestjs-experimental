// NestJS
import { PartialType } from '@nestjs/swagger';

// DTOs
import { CreateBookDto } from '@/books/dto/create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) { }