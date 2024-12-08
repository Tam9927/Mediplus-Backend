import { Injectable } from '@nestjs/common';
import testRepository from './test.repository';
import { TestDTO } from 'src/test/dto/test.dto';

@Injectable()
export class TestService {
  async createTest(data: TestDTO) {
    return await testRepository.create(data);
  }

  async getTestById(id: number) {
    return await testRepository.findById(id);
  }

  async updateTest(id: number, data: any) {
    return await testRepository.updateTest(id, data);
  }
}

  
