// NestJS
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// TypeORM
import { Repository } from 'typeorm';

// DTOs & Entities
import { CreateBookDto } from '@/books/dto/create-book.dto';
import { Book } from '@/books/book.entity';

@Injectable()
export class BooksService {

  constructor(@InjectRepository(Book) private booksRepository: Repository<Book>) { }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = new Book();
    book.name = createBookDto.name;
    book.translator = createBookDto.translator;
    book.category = createBookDto.category;
    book.language = createBookDto.language;
    book.numberOfPages = createBookDto.numberOfPages;
    book.authorName = createBookDto.authorName;
    book.authorId = createBookDto.authorId;
    book.publisher = createBookDto.publisher;
    book.publicationDate = createBookDto.publicationDate;
    book.textToSpeech = createBookDto.textToSpeech;
    book.price = createBookDto.price;

    const result = this.booksRepository.save(book);
    return result;
  }

  async findAll(): Promise<Book[]> {
    const books = await this.booksRepository.find();
    return books;
  }

  async findOne(id: number): Promise<Book | null> {
    const book = await this.booksRepository.findOneBy({ id });
    return book;
  }

  async remove(id: number): Promise<void> {
    await this.booksRepository.delete({ id });
  }

}
