import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class registerDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}