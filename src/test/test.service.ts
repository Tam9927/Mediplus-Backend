import { Injectable } from '@nestjs/common';
import testRepository from './test.repository';

@Injectable()
export class TestService {
  async createTest(data: any) {
    return await testRepository.create(data);
  }

  async getTestById(id: number) {
    return await testRepository.findById(id);
  }

  async updateTest(id: number, data: any) {
    return await testRepository.updateTest(id, data);
  }
}

  
