
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TestRequestService } from './test-request.service';
import { ValidationPipe } from '@nestjs/common';
import { TestRequestDTO } from 'src/test-request/dto/test-request.dto';

@ApiTags('Test Requests')
@Controller('test-requests')
export class TestRequestController {
  constructor(private readonly testRequestService: TestRequestService) {}

  @ApiOperation({ summary: 'Create a new test request' })
  @ApiResponse({
    status: 201,
    description: 'Test request created successfully',
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @Post()
  async createTestRequest(@Body(new ValidationPipe()) testRequestDTO: TestRequestDTO) {
    return await this.testRequestService.createRequest(testRequestDTO);
  }

  @ApiOperation({ summary: 'Get test request by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the test request details',
  })
  @ApiResponse({ status: 404, description: 'Test request not found' })
  @ApiParam({ name: 'id', description: 'Test request ID', example: 1 })
  @Get(':id')
  async getRequestById(@Param('id') id: number) {
    return await this.testRequestService.getRequestById(id);
  }

  @ApiOperation({ summary: 'Get all test requests' })
  @ApiResponse({
    status: 200,
    description: 'Returns all test requests',
  })
  @Get()
  async getAllRequests() {
    return await this.testRequestService.getAllRequests();
  }

  @ApiOperation({ summary: 'Process payment for a test request' })
  @ApiResponse({
    status: 200,
    description: 'Payment processed successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid payment amount',
  })
  @ApiParam({ name: 'id', description: 'Test request ID', example: 1 })
  @Patch(':id/process-payment')
  async processPayment(
    @Param('id') id: number,
    @Body('paymentAmount') paymentAmount: number,
  ) {
    if (paymentAmount <= 0) {
      throw new BadRequestException('Payment amount must be greater than zero');
    }
    return await this.testRequestService.processPayment(id, paymentAmount);
  }
}