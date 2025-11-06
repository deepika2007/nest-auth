import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { registerDTO } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async createUser(@Body() registerDTO: registerDTO) {
        return await this.userModel.create({
            name: registerDTO.name,
            email: registerDTO.email,
            password: registerDTO.password
        })
    }

}
