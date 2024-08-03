// NestJS
import { PartialType } from '@nestjs/swagger';

// DTOs
import { CreateAuthorDto } from '@/authors/dto/create-author.dto';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) { }