

import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TestRequestService } from './test-request.service';
import { ValidationPipe } from '@nestjs/common';

@Controller('test-requests')
export class TestRequestController {
  constructor(private readonly testRequestService: TestRequestService) {}

  @Post()
  async createRequest(@Body(new ValidationPipe()) data) {
    return await this.testRequestService.createRequest(data);
  }

  @Get(':id')
  async getRequestById(@Param('id') id: number) {
    return await this.testRequestService.getRequestById(id);
  }

  @Get()
  async getAllRequests() {
    return await this.testRequestService.getAllRequests();  
  }
}

