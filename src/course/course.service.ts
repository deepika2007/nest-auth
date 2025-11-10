import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Model } from 'mongoose';
import { Course } from './schemas/course.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<Course>
  ) { }

  async create(createCourseDto: CreateCourseDto) {
    try {
      return await this.courseModel.create({
        name: createCourseDto.name,
        price: createCourseDto.price,
        level: createCourseDto.level,
        description: createCourseDto.description
      })
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    return await this.courseModel.find()
  }

  async findOne(id: number) {
    return await this.courseModel.findById(id)
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return await this.courseModel.findByIdAndUpdate(id, updateCourseDto)
  }

  async remove(id: number) {
    return await this.courseModel.findByIdAndDelete(id)
  }
}
