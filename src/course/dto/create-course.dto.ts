import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCourseDto {

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsString()
    level: string
}
