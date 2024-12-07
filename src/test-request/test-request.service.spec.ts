import { Test, TestingModule } from '@nestjs/testing';
import { TestRequestService } from './test-request.service';

describe('TestRequestService', () => {
  let service: TestRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestRequestService],
    }).compile();

    service = module.get<TestRequestService>(TestRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
       