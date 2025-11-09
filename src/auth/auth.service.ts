import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { registerDTO } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { loginDTO } from './dto/loginUser.dto';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async registerUser(registerUserDTO: registerDTO) {
        try {
            const saltRound = 10
            const hash = await bcrypt.hash(registerUserDTO.password, saltRound)
            const user = await this.userService.createUser({ ...registerUserDTO, password: hash })

            const payload = { sub: user._id, }
            const token = await this.jwtService.signAsync(payload)
            return token
        } catch (error) {
            throw error
        }
    }

    async loginUser(loginUserDTO: loginDTO) {
        try {
            const user = await this.userService.loginUser(loginUserDTO)
            const payload = { sub: user._id }
            const token = await this.jwtService.signAsync(payload)
            return token
        } catch (error) {
            throw error
        }
    }
}
