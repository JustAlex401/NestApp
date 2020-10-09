import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser, IUsersService } from './interfaces/index';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserException, NotFoundUserException } from 'src/common/exception-filter/exceptions';


@Injectable()
export class UsersService implements IUsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) { }

    async create(createUserDto: CreateUserDto): Promise<IUser> {
        try{
            const createdUser = new this.userModel(createUserDto);
            if(!createUserDto){
                throw new CreateUserException('Cant create!')
            }
            return await createdUser.save();
        }catch(err){
            return err;
        }
        
    }

    async findAll(): Promise<IUser[]> {
        try{
            return await this.userModel.find().exec();
        }catch(err){
            return err;
        }
    }

    async findById(id : string): Promise<IUser>{
        try{
            return await this.userModel.findById(id).exec();
        }catch(err){
            return err;
        }
    }

    async delete(id: string): Promise<IUser> {
        try{
            const user = await this.userModel.findById(id).exec();

            if(!user){
                throw new NotFoundUserException('Not found');
            }

            const result = await this.userModel.findByIdAndRemove(id).exec();
            return result;
        }catch(err){
            return err;
        }
    }

    async update(id :string, newVal : UpdateUserDto): Promise<IUser>{
        try{
            const user = await this.userModel.findById(id).exec();

            if(!user){
                throw new NotFoundUserException('Not found');
            }

            return await this.userModel.findByIdAndUpdate(id, newVal, {new: true}).exec();
        }catch(err){
            return err;
        }
    }
}
