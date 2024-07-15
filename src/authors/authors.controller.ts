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
import { AuthorsService } from '@/authors/authors.service';

// DTOs & Entities
import { CreateAuthorDto } from '@/authors/dto/create-author.dto';
import { Author } from '@/authors/author.entity';

// Decorators
import { Public } from '@/common/decorators/public.decorator';
import { Roles } from '@/common/decorators/roles.decorator';

//@ApiBearerAuth()
@ApiTags('authors')
@Controller('authors')
export class AuthorsController {

  constructor(private readonly authorsService: AuthorsService) { }

  @Public()
  @Post()
  //@Roles(['admin'])
  @ApiOperation({ summary: 'Create Author' })
  @ApiCreatedResponse({
    description: 'The author has been successfully created!',
    type: String
  })
  create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorsService.create(createAuthorDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get All Authors' })
  @ApiOkResponse({
    type: Author,
    isArray: true
  })
  findAll(): Promise<Author[]> {
    return this.authorsService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get Author' })
  @ApiOkResponse({
    description: 'The author has been successfully found!',
    type: Author
  })
  @ApiNotFoundResponse({
    description: 'The author could not found!',
    type: String
  })
  findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Author> {
    return this.authorsService.findOne(id);
  }

  @Delete(':id')
  @Roles(['admin'])
  @ApiOperation({ summary: 'Delete Author' })
  @ApiNoContentResponse({
    description: 'The author has been successfully deleted!',
    type: String
  })
  delete(@Param('id', new ParseIntPipe()) id: number): void {
    this.authorsService.remove(id);
  }

}