
import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { TestService } from './test.service';
import { ValidationPipe } from '@nestjs/common';
import { TestDTO } from './dto/test.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Tests') // Group endpoints under 'Tests' in Swagger UI
@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new test' })
  @ApiResponse({ status: 201, description: 'Test created successfully.' })
  @ApiResponse({ status: 400, description: 'Validation failed or bad request.' })
  @ApiBody({ type: TestDTO })
  async createTest(@Body(new ValidationPipe()) data: TestDTO) {
    return await this.testService.createTest(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a test by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the test to retrieve' })
  @ApiResponse({ status: 200, description: 'Test retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Test not found.' })
  async getTestById(@Param('id') id: number) {
    return await this.testService.getTestById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a test by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the test to update' })
  @ApiBody({ description: 'Updated data for the test', type: TestDTO })
  @ApiResponse({ status: 200, description: 'Test updated successfully.' })
  @ApiResponse({ status: 400, description: 'Validation failed or bad request.' })
  @ApiResponse({ status: 404, description: 'Test not found.' })
  async updateTest(@Param('id') id: number, @Body() data: Partial<TestDTO>) {
    return await this.testService.updateTest(id, data);
  }
}
  