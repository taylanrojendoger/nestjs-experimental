// NestJS
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// TypeORM
import { Repository } from 'typeorm';

// DTOs & Entities
import { CreateAuthorDto } from '@/authors/dto/create-author.dto';
import { Author } from '@/authors/author.entity';

@Injectable()
export class AuthorsService {

  constructor(@InjectRepository(Author) private authorsRepository: Repository<Author>) { }

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = new Author();
    author.name = createAuthorDto.name;
    author.nationality = createAuthorDto.nationality;
    author.birthdate = createAuthorDto.birthdate;
    author.email = createAuthorDto.email;
    author.books = createAuthorDto.books;

    const result = this.authorsRepository.save(author);
    return result;
  }

  async findAll(): Promise<Author[]> {
    const authors = await this.authorsRepository.find();
    return authors;
  }

  async findOne(id: number): Promise<Author | null> {
    const author = await this.authorsRepository.findOneBy({ id });
    return author;
  }

  async remove(id: number): Promise<void> {
    await this.authorsRepository.delete({ id });
  }

}
