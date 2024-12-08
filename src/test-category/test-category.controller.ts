import { Controller, Post, Body, Get } from '@nestjs/common';
import { TestCategoryService } from './test-category.service';
import { ValidationPipe } from '@nestjs/common';
import { TestCategoryDTO } from 'src/test-category/dto/test-category.dto';

@Controller('test-categories')
export class TestCategoryController {
  constructor(private readonly testCategoryService: TestCategoryService) {}

  @Post()
  async createCategory(@Body(new ValidationPipe()) data: TestCategoryDTO) {
    return await this.testCategoryService.createCategory(data);
  }

  @Get()
  async getAllCategories() {
    return await this.testCategoryService.getAllCategories();
  }
} 
