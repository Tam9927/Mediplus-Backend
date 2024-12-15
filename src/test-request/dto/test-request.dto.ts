import { IsInt, IsNotEmpty, IsString, IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TestRequestDTO {
  @ApiProperty({
    description: 'ID of the doctor associated with the test request',
    example: 123,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  doctorId: number;

  @ApiProperty({
    description: 'ID of the patient associated with the test request',
    example: 456,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  patientId: number;

  @ApiProperty({
    description: 'Array of test IDs requested',
    example: [1, 2, 3],
    required: true,
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  tests: number[];

  @ApiProperty({
    description: 'Status of the test request (e.g., "Pending", "Completed")',
    example: 'Pending',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  Status: string;
}
