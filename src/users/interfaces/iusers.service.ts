import { CreateUserDto } from '../dto/createUser.dto';
import { IUser } from './users.interface';

export interface IUsersService {
    findAll(): Promise<IUser[]>;
    findById(id: string): Promise<IUser | null | void>;
    create(user: IUser): Promise<IUser>;
    update(id: string, newValue: CreateUserDto): Promise<IUser | null>;
    delete(id: string): Promise<IUser>;
}