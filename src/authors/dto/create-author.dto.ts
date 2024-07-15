// Class Validator
import { IsArray, IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

// Model
import { Book } from '@/books/book.entity';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {

    @ApiProperty({ description: 'The name of the author' })
    @IsString()
    readonly name: string;

    @ApiProperty({ description: 'The nationality of the author' })
    @IsString()
    readonly nationality: string

    @ApiProperty({ description: 'The birthdate of the author' })
    @IsDateString()
    readonly birthdate: Date;

    @ApiProperty({ description: 'The email of the author' })
    @IsOptional()
    @IsEmail()
    readonly email?: string | null;

    @ApiProperty({ description: 'Books written by the author' })
    @IsArray()
    @Type(() => Book)
    readonly books: Book[];

}