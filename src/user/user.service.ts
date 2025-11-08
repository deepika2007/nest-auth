import { Body, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { registerDTO } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async createUser(@Body() registerDTO: registerDTO) {
        try {
            return await this.userModel.create({
                name: registerDTO.name,
                email: registerDTO.email,
                password: registerDTO.password
            })
        } catch (error) {
            if (error?.code === 11000) {
                throw new ConflictException('Email already exist.')
            }
            throw error
        }
    }

    async getUserById(id: string) {
        return await this.userModel.findOne({ _id: id })
    }
}
