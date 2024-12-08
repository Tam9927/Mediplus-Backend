import { IsString, IsNumber, IsOptional, IsPositive, IsPhoneNumber, IsEmpty, IsNotEmpty } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  age: number;

  @IsPhoneNumber('BD')
  @IsNotEmpty()  // Update 'BD' to your desired country code
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
