import TestRequest from '../model/testRequest.model';

class TestRequestRepository {
  async create(data: any) {
    return await TestRequest.create(data);
  }

  async findById(id: number) {
    return await TestRequest.findByPk(id);
  }

  async findAll() {
    return await TestRequest.findAll({ include: { all: true } });
  }
}

export default new TestRequestRepository();
  