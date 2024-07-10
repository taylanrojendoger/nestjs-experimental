// NestJS
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  UseGuards
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

  @Post()
  @Roles(['admin'])
  @ApiOperation({ summary: 'Create Book' })
  @ApiCreatedResponse({
    description: 'The book has been successfully created!',
    type: String
  })
  create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.create(createBookDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get All Books' })
  @ApiOkResponse({
    type: Book,
    isArray: true
  })
  findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get Book' })
  @ApiOkResponse({
    description: 'The book has been successfully found!',
    type: Book
  })
  @ApiNotFoundResponse({
    description: 'The book could not found!',
    type: String
  })
  findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Delete(':id')
  @Roles(['admin'])
  @ApiOperation({ summary: 'Delete Book' })
  @ApiNoContentResponse({
    description: 'The book has been successfully deleted!',
    type: String
  })
  delete(@Param('id', new ParseIntPipe()) id: number): void {
    this.bookService.remove(id);
  }

}