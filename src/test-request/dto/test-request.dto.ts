import { IsInt, IsNotEmpty, IsString, IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TestRequestDTO {
  @IsInt()
  @IsNotEmpty()
  doctorId: number; // Foreign key to Doctor

  @IsInt()
  @IsNotEmpty()
  patientId: number; // Foreign key to Patient

  @IsArray()  
  @ArrayNotEmpty()
  @IsInt({ each: true }) // Ensures every element in the array is an integer
  tests: number[]; // Array of Test IDs

  @IsString()
  @IsNotEmpty()
  paymentStatus: string; // The status of the test request (e.g., "Pending", "Completed")
}  
