import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDTO } from './dto/registerUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';
import { loginDTO } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }

    @Post('register')
    async register(@Body() registerUserDTO: registerDTO) {
        try {
            const token = await this.authService.registerUser(registerUserDTO)
            return { access_token: token }
        } catch (error) {
            throw error
        }

    }

    @Post('login')
    async login(@Body() loginUserDTO: loginDTO) {
        try {
            const token = await this.authService.loginUser(loginUserDTO)
            return { access_token: token }
        } catch (error) {
            throw error
        }

    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        const userId = req.user.sub
        const user = await this.userService.findOne(userId)
        return user
    }

}
