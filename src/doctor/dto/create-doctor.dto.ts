
import { IsString, IsNumber, IsPositive, IsPhoneNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({
    description: 'Name of the doctor',
    example: 'Dr. John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Contact number of the doctor (must be a valid phone number for the specified country)',
    example: '+8801712345678', // Update the example as needed
  })
  @IsPhoneNumber('BD') // Change 'BD' to your desired country code
  @IsNotEmpty()
  contact: string;

  @ApiProperty({
    description: 'Specialization of the doctor',
    example: 'Cardiologist',
  })
  @IsString()
  @IsNotEmpty()
  specialization: string;

  @ApiProperty({
    description: 'Total income of the doctor (must be a positive number)',
    example: 120000.50,
  })
  @IsNumber()
  @IsPositive()
  totalIncome: number;
}

  