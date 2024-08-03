// NestJS
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  ParseUUIDPipe
} from '@nestjs/common';

// Swagger
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';

// Services
import { BooksService } from '@/books/books.service';

// DTOs & Entities
import { CreateBookDto } from '@/books/dto/create-book.dto';
import { Book } from '@/books/book.entity';

// Decorators
import { Public } from '@/common/decorators/public.decorator';
import { Roles } from '@/common/decorators/roles.decorator';

//@ApiBearerAuth()
@ApiTags('books')
@Controller('books')
export class BooksController {

  constructor(private readonly bookService: BooksService) { }

  @Public()
  //@Roles(['admin'])
  @ApiOperation({ summary: 'Create Book' })
  @ApiCreatedResponse({
    description: 'The book has been successfully created!',
    type: String
  })
  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<string> {
    return this.bookService.create(createBookDto);
  }

  @Public()
  @ApiOperation({ summary: 'Get All Books' })
  @ApiOkResponse({
    type: Book,
    isArray: true
  })
  @Get()
  findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Get Book' })
  @ApiOkResponse({
    description: 'The book has been successfully found!',
    type: Book
  })
  @ApiNotFoundResponse({
    description: 'The book could not found!',
    type: String
  })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Public()
  //@Roles(['admin'])
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Book' })
  @ApiNoContentResponse({
    description: 'The book has been successfully deleted!',
    type: String
  })
  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe()) id: string): void {
    this.bookService.remove(id);
  }

}