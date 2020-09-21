import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser, IUsersService } from './interfaces/index';
import { CreateUserDto } from './dto/createUser.dto';


@Injectable()
export class UsersService implements IUsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) { }

    async create(createUserDto: CreateUserDto): Promise<IUser> {
            const createdUser = new this.userModel(createUserDto);
            console.log(createdUser)
            const res = await createdUser.save();
            return res;
    }

    async findAll(): Promise<IUser[]> {
        return await this.userModel.find().exec();
    }

    async findById(id : string): Promise<IUser>{
        return await this.userModel.findById(id).exec();
        
    }

    async delete(id: string): Promise<string> {
        const user = await this.userModel.findById(id).exec();
        if(user === null){
            return 'Not found';
        } else{
            await this.userModel.findByIdAndRemove(id).exec();
            return `The user has been deleted`;
        }
    }

    async update(id :string, newVal : CreateUserDto): Promise<IUser>{
        const user = await this.userModel.findById(id).exec()
        if(user === null){
            console.log('user not found');
            return null;
        }
        else {
            return await this.userModel.findByIdAndUpdate(id, newVal, {new: true}).exec();
        }
       
    }


}
