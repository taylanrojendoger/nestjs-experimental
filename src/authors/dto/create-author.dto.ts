// Class Validator
import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

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

}