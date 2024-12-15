import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TestCategoryDTO {
  @ApiProperty({
    description: 'Name of the test category',
    example: 'Blood Test',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Optional description of the test category',
    example: 'Tests related to blood analysis',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
