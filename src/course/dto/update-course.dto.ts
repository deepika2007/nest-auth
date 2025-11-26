import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
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
