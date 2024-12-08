import { Injectable } from '@nestjs/common';
import testCategoryRepository from './test-category.repository';
import { TestCategoryDTO } from 'src/test-category/dto/test-category.dto';

@Injectable()
export class TestCategoryService {
  async createCategory(data: TestCategoryDTO) {
    return await testCategoryRepository.create(data);
  }

  async getAllCategories() {
    return await testCategoryRepository.findAll();
  }
}
  