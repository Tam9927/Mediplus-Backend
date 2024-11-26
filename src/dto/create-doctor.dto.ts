import { IsString, IsNumber, IsPositive, IsPhoneNumber, IsNotEmpty, isNotEmpty } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  name: string;

  @IsPhoneNumber('BD')   // Update 'BD' to your desired country code
  contact: string;

  @IsString()
  specialization: string;
}
  