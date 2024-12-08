import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { TestService } from './test.service';
import { ValidationPipe } from '@nestjs/common';
import { TestDTO } from './dto/test.dto';

@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  async createTest(@Body(new ValidationPipe()) data:TestDTO) {
    return await this.testService.createTest(data);
  }

  @Get(':id')
  async getTestById(@Param('id') id: number) {
    return await this.testService.getTestById(id);
  }

  @Patch(':id')
  async updateTest(@Param('id') id: number, @Body() data) {
    return await this.testService.updateTest(id, data);
  }
}
