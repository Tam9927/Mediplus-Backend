import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class TestDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  testCategoryId: number;  // Foreign key to TestCategory

  @IsOptional()
  description?: string;  // Optional description for the test
}
