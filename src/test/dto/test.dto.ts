import { IsString, IsNotEmpty, IsInt, IsOptional, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TestDTO {
  @ApiProperty({
    description: 'Name of the test',
    example: 'Complete Blood Count',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'ID of the test category to which this test belongs',
    example: 1,
    required: true,
  })
  @IsInt()
  testCategoryId: number;

  @ApiProperty({
    description: 'Optional description of the test',
    example: 'A test to measure various components of the blood',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Cost of the test, must be a positive number',
    example: 500,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  cost: number;
}

