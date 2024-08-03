// NestJS
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// TypeORM
import { Repository } from 'typeorm';

// DTOs & Entities
import { CreateBookDto } from '@/books/dto/create-book.dto';
import { Book } from '@/books/book.entity';

@Injectable()
export class BooksService {

  private readonly logger = new Logger(BooksService.name);

  constructor(@InjectRepository(Book) private booksRepository: Repository<Book>) { }

  async checkExistingBook(createBookDto: CreateBookDto): Promise<Book | null> {
    const existingBook = await this.booksRepository
      .createQueryBuilder("book")
      .leftJoinAndSelect("book.authorId", "author")
      .where("book.name = :name", { name: createBookDto.name })
      .andWhere("book.authorId = :authorId", { authorId: createBookDto.authorId })
      .getOne()
      .catch(err => {
        this.logger.error(`FIND_EXISTING_BOOK:${createBookDto.name}:${err}`);
      });

    return existingBook || null;
  }

  async create(createBookDto: CreateBookDto): Promise<string> {
    const existingBook = await this.checkExistingBook(createBookDto);

    if (existingBook) {
      throw new HttpException(`Book already exists!`, HttpStatus.CONFLICT);
    }

    const book = new Book();
    book.name = createBookDto.name;
    book.translator = createBookDto.translator;
    book.category = createBookDto.category;
    book.language = createBookDto.language;
    book.numberOfPages = createBookDto.numberOfPages;
    book.authorId = createBookDto.authorId;
    book.publisher = createBookDto.publisher;
    book.publicationDate = createBookDto.publicationDate;
    book.textToSpeech = createBookDto.textToSpeech;
    book.price = createBookDto.price;

    const result = await this.booksRepository.save(book).catch(err => {
      this.logger.error(`POST:BOOK:${createBookDto.name}:${err}`);
    });

    if (result) {
      this.logger.log(`POST:BOOK:${result.id}`);
      return result.id;
    }

    throw new HttpException(`Book could not be created!`, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async findAll(): Promise<Book[] | []> {
    const books = await this.booksRepository.find().catch(err => {
      this.logger.error(`GET:BOOKS:${err}`);
    });

    if (books && books.length > 0) {
      this.logger.log('GET:BOOKS:FULFILLED');
      return books;
    }

    return [];
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.booksRepository.findOneBy({ id }).catch(err => {
      this.logger.error(`GET:BOOK:${id}:${err}`);
    });

    if (book) {
      this.logger.log(`GET:BOOK:${book.id}`);
      return book;
    }

    throw new HttpException(`Book not found!`, HttpStatus.NOT_FOUND);
  }

  async remove(id: string): Promise<void> {
    const result = await this.booksRepository.delete(id).catch(err => {
      this.logger.error(`DELETE:BOOK:${id}:${err}`);
    });

    if (result && result.affected && result.affected > 0) {
      this.logger.log(`DELETE:BOOK:${id}`);
    }

    throw new HttpException(`Book not found!`, HttpStatus.NOT_FOUND);
  }

}
