import { Controller, Post, Body, Get, Param, Delete, Patch, BadRequestException, UseFilters, UseInterceptors, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { HttpExceptionFilter } from '../common/exception-filter/http-exception.filter';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { UpdateUserDto } from './dto/updateUser.dto';

@UseInterceptors(LoggingInterceptor)
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    @UseFilters(HttpExceptionFilter)
    @ApiBody({type: CreateUserDto })
    public async createUser(@Body() createUserDto: CreateUserDto) {
        const result = await this.userService.create(createUserDto);

        if(result instanceof Error){
            throw new BadRequestException('Bad request');
        }
        
        return result;
    }
    
    @Get()
    @UseFilters(HttpExceptionFilter)
    public async getUsers() {
        const result = await this.userService.findAll();

        if(result instanceof Error){
            throw new NotFoundException('Not found');
        }

        return result;
    }

    @Get('/:id')
    @ApiParam({
        name: 'id',
        type: "string",
        description: "Users id"
    })
    @UseFilters(HttpExceptionFilter)
    public async getUserById(@Param('id') id:string){
        const result = await this.userService.findById(id);

        if(result instanceof Error){
            throw new NotFoundException('Not found');
        }

        return result;
    }

    @Delete('/:id')
    @ApiParam({
        name: 'id',
        type: "string",
        description: "Users id"
    })
    @UseFilters(HttpExceptionFilter)
    public async deleteUser(@Param('id') id:string) {
        const result = await this.userService.delete(id);

        if(result instanceof Error){
            throw new NotFoundException('Not found');
        }

        return result;
    }

    @Patch('/:id')
    @ApiParam({
        name: 'id',
        type: "string",
        description: "Users id"
    })
    @ApiBody({type: UpdateUserDto })
    @UseFilters(HttpExceptionFilter)
    public async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto){
        const result = await this.userService.update(id, updateUserDto);

        if(result instanceof Error){
            throw new BadRequestException('Bad request');
        }
        
        return result;
    }
}
