import { IsString, IsNumber, IsPositive, IsPhoneNumber, IsNotEmpty, isNotEmpty } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPhoneNumber('BD')
  @IsNotEmpty()   // Update 'BD' to your desired country code
  contact: string;

  @IsString()
  @IsNotEmpty()
  specialization: string;
}
  