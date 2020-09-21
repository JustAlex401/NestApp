import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {

    readonly _id: string;


    @ApiProperty({
        type: String,
        required: true,
        maxLength : 20,
    })
    @IsString()
    readonly firstName: string;


    @ApiProperty({
        type: String,
        maxLength : 30,
        required: false,
    })
    @IsString()
    @IsOptional()
    readonly lastName?: string;


    @ApiProperty({
        type: Number,
        minimum: 0,
        maximum: 120,
        required: true,
    })
    @IsNumber()
    readonly age: number;


    @ApiProperty({
        required: true,
        type: [String],
    })
    @IsArray()
    readonly hobbies: string[];
}