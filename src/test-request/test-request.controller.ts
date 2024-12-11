

import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { TestRequestService } from './test-request.service';
import { ValidationPipe } from '@nestjs/common';
import { TestRequestDTO } from 'src/test-request/dto/test-request.dto';

@Controller('test-requests')
export class TestRequestController {
  constructor(private readonly testRequestService: TestRequestService) {}

  @Post()
  async createTestRequest(@Body(new ValidationPipe()) testRequestDTO: TestRequestDTO) {
    return await this.testRequestService.createRequest(testRequestDTO);
  }

  @Get(':id')
  async getRequestById(@Param('id') id: number) {
    return await this.testRequestService.getRequestById(id);
  }

  @Get()
  async getAllRequests() {
    return await this.testRequestService.getAllRequests();  
  }

  @Patch(':id/process-payment')
  async processPayment(
    @Param('id') id: number,  
    @Body('paymentAmount') paymentAmount: number, // Retrieve payment amount from request body
  ) {
    if (paymentAmount <= 0) {
      throw new BadRequestException('Payment amount must be greater than zero');
    }
    return await this.testRequestService.processPayment(id, paymentAmount);
  }
  

}

