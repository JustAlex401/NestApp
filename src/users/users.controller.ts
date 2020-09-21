import { Controller, Post, Response, Body, HttpStatus, Get, Param, Delete, Patch, BadRequestException, UseFilters, UseInterceptors, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiCreatedResponse, ApiHeader, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { HttpExceptionFilter } from '../common/exception-filter/http-exception.filter';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    @UseFilters(HttpExceptionFilter)
    @ApiBody({type: CreateUserDto })
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    public async createUser(@Response() res, @Body() createUserDto: CreateUserDto) {
            const user = await this.userService.create(createUserDto)
            .catch((err) => {
                throw new BadRequestException(err.message);
            });
            res.setHeader('Location', '/user/' + user._id);
            return res.status(HttpStatus.CREATED).json(user);

    }
    
    @Get()
    @UseFilters(HttpExceptionFilter)
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 404, description: 'Not found' })
    public async getUsers(@Response() res) {
        const users = await this.userService.findAll().catch(err => {
            throw new NotFoundException(err.message)
        });
        return res.status(HttpStatus.OK).json(users);
    }


    @Get('/:id')
    @ApiParam({
        name: 'id',
        type: "string",
        description: "Users id"
    })
    @UseFilters(HttpExceptionFilter)
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 400, description: 'Bad Request Exception' })
    public async getUserById(@Response() res, @Param('id') id:string){
        const user = await this.userService.findById(id).catch(err => {
            throw new BadRequestException(err.message)
        });
        return res.status(HttpStatus.OK).json(user);
    }


    @Delete('/:id')
    @ApiParam({
        name: 'id',
        type: "string",
        description: "Users id"
    })
    @UseFilters(HttpExceptionFilter)
    @ApiResponse({ status: 204, description: 'No content' })
    public async deleteUser(@Param('id') id:string, @Response() res) {
        const user = await this.userService.delete(id).catch(err => {
            throw new BadRequestException(err.message);
        });
        return res.status(HttpStatus.OK).json(user);
    }

    @Patch('/:id')
    @ApiParam({
        name: 'id',
        type: "string",
        description: "Users id"
    })
    @ApiBody({type: CreateUserDto })
    @UseFilters(HttpExceptionFilter)
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    public async updateUser(@Param('id') id: string, @Response() res, @Body() createUserDto: CreateUserDto){
        const user = await this.userService.update(id, createUserDto).catch(err => {
            throw new BadRequestException(err.message);
        });
        return res.status(HttpStatus.OK).json(user);
    }
    
}
