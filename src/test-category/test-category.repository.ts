import { TestCategory } from '../model/index';

class TestCategoryRepository {
  async create(data: any) {
    return await TestCategory.create(data);
  }

  async findAll() {
    return await TestCategory.findAll();
  }
}

export default new TestCategoryRepository();
  