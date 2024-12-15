import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TestCategoryService } from './test-category.service';
import { ValidationPipe } from '@nestjs/common';
import { TestCategoryDTO } from 'src/test-category/dto/test-category.dto';

@ApiTags('Test Categories')
@Controller('test-categories')
export class TestCategoryController {
  constructor(private readonly testCategoryService: TestCategoryService) {}

  @ApiOperation({ summary: 'Create a new test category' })
  @ApiResponse({
    status: 201,
    description: 'Test category created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error in the provided data',
  })
  @Post()
  async createCategory(@Body(new ValidationPipe()) data: TestCategoryDTO) {
    return await this.testCategoryService.createCategory(data);
  }

  @ApiOperation({ summary: 'Retrieve all test categories' })
  @ApiResponse({
    status: 200,
    description: 'List of all test categories',
  })
  @Get()
  async getAllCategories() {
    return await this.testCategoryService.getAllCategories();
  }
}
