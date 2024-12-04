import { Test } from '../model/index';

class TestRepository {
  async create(data: any) {
    return await Test.create(data);
  }

  async findById(id: number) {
    return await Test.findByPk(id);
  }

  async updateTest(id: number, data: any) {
    const test = await this.findById(id);
    if (test) {
      Object.assign(test, data);
      return await test.save();
    }
    return null;
  }
}  

export default new TestRepository();
