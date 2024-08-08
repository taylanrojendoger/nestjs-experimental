// NestJS
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put
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
import { UpdateAuthorDto } from '@/authors/dto/update-author.dto';
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
  //@Roles(['admin'])
  @ApiOperation({ summary: 'Create Author' })
  @ApiCreatedResponse({
    description: 'The author has been successfully created!',
    type: String
  })
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto): Promise<string> {
    return this.authorsService.create(createAuthorDto);
  }

  @Public()
  @ApiOperation({ summary: 'Get All Authors' })
  @ApiOkResponse({
    type: Author,
    isArray: true
  })
  @Get()
  findAll(): Promise<Author[]> {
    return this.authorsService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Get Author' })
  @ApiOkResponse({
    description: 'The author has been successfully found!',
    type: Author
  })
  @ApiNotFoundResponse({
    description: 'The author could not found!',
    type: String
  })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Author> {
    return this.authorsService.findOne(id);
  }

  @Public()
  @ApiOperation({ summary: 'Update Author' })
  @ApiOkResponse({
    description: 'The author has been successfully updated!'
  })
  @Put(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateAuthorDto: UpdateAuthorDto): Promise<void> {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Public()
  @Roles(['admin'])
  @ApiOperation({ summary: 'Delete Author' })
  @ApiNoContentResponse({
    description: 'The author has been successfully deleted!',
    type: String
  })
  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe()) id: string): void {
    this.authorsService.remove(id);
  }

}