import { Module } from '@nestjs/common';
import { TestRequestController } from './test-request.controller';
import { TestRequestService } from './test-request.service';

@Module({
  controllers: [TestRequestController],
  providers: [TestRequestService]
})
export class TestRequestModule {}
