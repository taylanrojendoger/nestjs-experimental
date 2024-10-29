// NestJS
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// TypeORM
import { Repository } from 'typeorm';

// Services
import { AuthorsService } from '@/authors/authors.service';
import { RedisService } from 'src/redis/redis.service';

// DTOs & Entities
import { CreateBookDto } from '@/books/dto/create-book.dto';
import { UpdateBookDto } from '@/books/dto/update-book.dto';
import { Book } from '@/books/book.entity';

@Injectable()
export class BooksService {

  private readonly logger = new Logger(BooksService.name);

  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
    private authorService: AuthorsService,
    private redisService: RedisService
  ) { }

  async checkExistingBook(createBookDto: CreateBookDto): Promise<Book | null> {
    const existingBook = await this.booksRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author')
      .where('book.name = :name', { name: createBookDto.name })
      .andWhere('book.author = :authorId', { authorId: createBookDto.authorId })
      .getOne()
      .catch(err => {
        this.logger.error(`FIND_EXISTING_BOOK:${createBookDto.name}:${err}`);
      });

    return existingBook || null;
  }

  async create(createBookDto: CreateBookDto): Promise<string> {
    const existingBook = await this.checkExistingBook(createBookDto);

    if (existingBook) {
      throw new HttpException('Book already exists!', HttpStatus.CONFLICT);
    }

    const author = await this.authorService.getAuthorById(createBookDto.authorId);

    const book = new Book();
    book.name = createBookDto.name;
    book.translator = createBookDto.translator;
    book.category = createBookDto.category;
    book.language = createBookDto.language;
    book.numberOfPages = createBookDto.numberOfPages;
    book.author = author;
    book.publisher = createBookDto.publisher;
    book.publicationDate = createBookDto.publicationDate;
    book.textToSpeech = createBookDto.textToSpeech;
    book.price = createBookDto.price;

    const result = await this.booksRepository.save(book).catch(err => {
      this.logger.error(`POST:BOOK:${createBookDto.name}:${err}`);
    });

    if (result) {
      this.logger.debug(`POST:BOOK:${result.id}`);
      return result.id;
    }

    throw new HttpException('Book could not be created!', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async findAll(): Promise<Book[] | []> {
    const cachedBooks: Book[] = await this.redisService.get('/api/v1/books') as Book[];

    if (cachedBooks) {
      return cachedBooks;
    }

    const books = await this.booksRepository.find().catch(err => {
      this.logger.error(`GET:BOOKS:${err}`);
    });

    if (books && books.length > 0) {
      this.logger.debug('GET:BOOKS:FULFILLED');
      await this.redisService.set('/api/v1/books', books);
      return books;
    }

    return [];
  }

  async findOne(id: string): Promise<Book> {
    const cachedBook: Book = await this.redisService.get(`/api/v1/books/${id}`) as Book;

    if (cachedBook) {
      return cachedBook;
    }

    const book = await this.booksRepository.findOneBy({ id }).catch(err => {
      this.logger.error(`GET:BOOK:${id}:${err}`);
    });

    if (book) {
      this.logger.debug(`GET:BOOK:${book.id}`);
      await this.redisService.set(`/api/v1/books/${id}`, book);
      return book;
    }

    throw new HttpException('Book not found!', HttpStatus.NOT_FOUND);
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<void> {
    const book = await this.findOne(id).catch(err => {
      this.logger.error(`PUT:BOOK:${id}:${err}`);
    });

    if (book) {
      const author = await this.authorService.getAuthorById(updateBookDto.authorId);

      book.name = updateBookDto.name;
      book.translator = updateBookDto.translator;
      book.category = updateBookDto.category;
      book.language = updateBookDto.language;
      book.numberOfPages = updateBookDto.numberOfPages;
      book.author = author;
      book.publisher = updateBookDto.publisher;
      book.publicationDate = updateBookDto.publicationDate;
      book.textToSpeech = updateBookDto.textToSpeech;
      book.price = updateBookDto.price;

      const result = await this.booksRepository.save(book).catch(err => {
        this.logger.error(`PUT:BOOK:${id}:${err}`);
      });

      if (result) {
        this.logger.debug(`PUT:BOOK:${id}`);
      }
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.booksRepository.delete(id).catch(err => {
      this.logger.error(`DELETE:BOOK:${id}:${err}`);
    });

    if (result && result.affected && result.affected > 0) {
      this.logger.debug(`DELETE:BOOK:${id}`);
    }

    throw new HttpException('Book not found!', HttpStatus.NOT_FOUND);
  }

}
