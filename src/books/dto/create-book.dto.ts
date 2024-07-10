// Class Validator
import { IsInt, IsString, IsEmail } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
    @ApiProperty({ description: 'The name of the book' })
    @IsString()
    readonly name: string;

    @ApiProperty({ description: 'The author of the book' })
    @IsString()
    readonly author: string;

    @ApiProperty({
        description: 'The price of the book',
        minimum: 0,
        default: 0
    })
    @IsInt()
    readonly price: number;
}