// Class Validator
import { IsBoolean, IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {

    @ApiProperty({ description: 'The name of the book' })
    @IsString()
    readonly name: string;

    @ApiProperty({ description: 'The translator name of the book' })
    @IsOptional()
    @IsString()
    readonly translator?: string | null;

    @ApiProperty({ description: 'The category of the book' })
    @IsOptional()
    @IsString()
    readonly category?: string | null;

    @ApiProperty({ description: 'The language of the book' })
    @IsString()
    readonly language: string;

    @ApiProperty({ description: 'The number of pages of the book' })
    @IsInt()
    readonly numberOfPages: number;

    @ApiProperty({ description: 'The author id of the book' })
    @IsString()
    readonly authorId: string;

    @ApiProperty({ description: 'The publisher of the book' })
    @IsString()
    readonly publisher: string;

    @ApiProperty({ description: 'The publication date of the book' })
    @IsDateString()
    readonly publicationDate: Date;

    @ApiProperty({
        description: 'The text to speech feature of the book',
        default: false
    })
    @IsBoolean()
    readonly textToSpeech: boolean;

    @ApiProperty({ description: 'The price of the book' })
    @IsOptional()
    @IsInt()
    readonly price?: number | null;

}