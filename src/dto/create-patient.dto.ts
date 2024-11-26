import { IsString, IsNumber, IsOptional, IsPositive, IsPhoneNumber, IsEmpty, IsNotEmpty } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  age: number;

  @IsPhoneNumber('BD')  // Update 'BD' to your desired country code
  contact: string;

  @IsOptional()
  @IsNumber()
  doctor_id?: number;

  @IsOptional()
  @IsNumber()
  agent_id?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  due_amount?: number;
}
