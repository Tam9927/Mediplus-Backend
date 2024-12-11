import { IsString, IsNotEmpty, IsInt, IsOptional, IsNumber,IsPositive } from 'class-validator';

export class TestDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  testCategoryId: number;  // Foreign key to TestCategory

  @IsOptional()
  description?: string;  // Optional description for the test

  @IsNumber()
  @IsPositive()
  cost: number;


}
