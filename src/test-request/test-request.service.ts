import { Injectable } from '@nestjs/common';
import testRequestRepository from './test-request.repository';

@Injectable()
export class TestRequestService {
  async createRequest(data: any) {
    return await testRequestRepository.create(data);
  }

  async getRequestById(id: number) {
    return await testRequestRepository.findById(id);
  }

  async getAllRequests() {
    return await testRequestRepository.findAll();
  }
}
  