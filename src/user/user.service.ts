import { Body, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { registerDTO } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { loginDTO } from 'src/auth/dto/loginUser.dto';

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

    async loginUser(@Body() loginUserDTO: loginDTO) {
        try {

            const user = await this.userModel.findOne({ email: loginUserDTO?.email })
            if (!user) {
                throw new NotFoundException('Not found.')
            }

            const isMatch = await bcrypt.compare(loginUserDTO.password, user.password);

            if (!isMatch) {
                throw new Error('Invalid email or password.');
            }

            return user
        } catch (error) {
            throw error
        }
    }

    async getUserById(id: string) {
        try {
            return await this.userModel.findById(id, ['id', 'name', 'role', 'email'])
        } catch (error) {
            throw error
        }
    }
}
