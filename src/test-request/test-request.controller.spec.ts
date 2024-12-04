import { Test, TestingModule } from '@nestjs/testing';
import { TestRequestController } from './test-request.controller';

describe('TestRequestController', () => {
  let controller: TestRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestRequestController],
    }).compile();

    controller = module.get<TestRequestController>(TestRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
