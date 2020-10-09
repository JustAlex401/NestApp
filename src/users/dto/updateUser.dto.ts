import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    readonly _id: string;

    @ApiProperty({
        type: String,
        maxLength : 20,
    })
    @IsString()
    @IsOptional()
    readonly firstName?: string;

    @ApiProperty({
        type: String,
        maxLength : 30,
    })
    @IsString()
    @IsOptional()
    readonly lastName?: string;

    @ApiProperty({
        type: Number,
        minimum: 0,
        maximum: 120,
    })
    @IsNumber()
    @IsOptional()
    readonly age?: number;

    @ApiProperty({
        type: [String],
    })
    @IsArray()
    @IsOptional()
    readonly hobbies?: string[];
}