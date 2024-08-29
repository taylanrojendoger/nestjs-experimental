// NestJS
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// TypeORM
import { Repository } from 'typeorm';

// Services
import { RedisService } from 'src/redis/redis.service';

// DTOs & Entities
import { CreateAuthorDto } from '@/authors/dto/create-author.dto';
import { UpdateAuthorDto } from '@/authors/dto/update-author.dto';
import { Author } from '@/authors/author.entity';

@Injectable()
export class AuthorsService {

  private readonly logger = new Logger(AuthorsService.name);

  constructor(
    @InjectRepository(Author) private authorsRepository: Repository<Author>,
    private redisService: RedisService
  ) { }

  async checkExistingAuthor(createAuthorDto: CreateAuthorDto): Promise<Author | null> {
    const existingAuthor = await this.authorsRepository
      .createQueryBuilder('author')
      .where('author.name = :name', { name: createAuthorDto.name })
      .getOne()
      .catch(err => {
        this.logger.error(`FIND_EXISTING_AUTHOR:${createAuthorDto.name}:${err}`);
      });

    return existingAuthor || null;
  }

  async create(createAuthorDto: CreateAuthorDto): Promise<string> {
    const existingAuthor = await this.checkExistingAuthor(createAuthorDto);

    if (existingAuthor) {
      throw new HttpException('Author already exists!', HttpStatus.CONFLICT);
    }

    const author = new Author();
    author.name = createAuthorDto.name;
    author.nationality = createAuthorDto.nationality;
    author.birthdate = createAuthorDto.birthdate;
    author.email = createAuthorDto.email;

    const result = await this.authorsRepository.save(author).catch(err => {
      this.logger.error(`POST:AUTHOR:${createAuthorDto.name}:${err}`);
    });

    if (result) {
      this.logger.debug(`POST:AUTHOR:${result.id}`);
      return result.id;
    }

    throw new HttpException('Author could not be created!', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async findAll(): Promise<Author[] | []> {
    const cachedAuthors: Author[] = await this.redisService.get('/api/v1/authors') as Author[];

    if (cachedAuthors) {
      return cachedAuthors;
    }

    const authors = await this.authorsRepository.find().catch(err => {
      this.logger.error(`GET:AUTHORS:${err}`);
    });

    if (authors && authors.length > 0) {
      this.logger.debug('GET:AUTHORS:FULFILLED');
      await this.redisService.set('/api/v1/authors', authors);
      return authors;
    }

    return [];
  }

  async findOne(id: string): Promise<Author> {
    const cachedAuthor: Author = await this.redisService.get(`/api/v1/authors/${id}`) as Author;

    if (cachedAuthor) {
      return cachedAuthor;
    }

    const author = await this.authorsRepository.findOneBy({ id }).catch(err => {
      this.logger.error(`GET:AUTHOR:${id}:${err}`);
    });

    if (author) {
      this.logger.debug(`GET:AUTHOR:${author.id}`);
      await this.redisService.set(`/api/v1/authors/${id}`, author);
      return author;
    }

    throw new HttpException('Author not found!', HttpStatus.NOT_FOUND);
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<void> {
    const author = await this.findOne(id).catch(err => {
      this.logger.error(`PUT:AUTHOR:${id}:${err}`);
    });

    if (author) {
      author.name = updateAuthorDto.name;
      author.nationality = updateAuthorDto.nationality;
      author.birthdate = updateAuthorDto.birthdate;
      author.email = updateAuthorDto.email;

      const result = await this.authorsRepository.save(author).catch(err => {
        this.logger.error(`PUT:AUTHOR:${id}:${err}`);
      });

      if (result) {
        this.logger.debug(`PUT:AUTHOR:${id}`);
      }
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.authorsRepository.delete(id).catch(err => {
      this.logger.error(`DELETE:AUTHOR:${id}:${err}`);
    });

    if (result && result.affected && result.affected > 0) {
      this.logger.debug(`DELETE:AUTHOR:${id}`);
    }

    throw new HttpException('Author not found!', HttpStatus.NOT_FOUND);
  }

}
