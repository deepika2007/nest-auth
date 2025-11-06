import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDTO } from './dto/registerUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() registerUserDTO: registerDTO) {
        const token = this.authService.registerUser(registerUserDTO)
        return { access_token: token }
    }

}
