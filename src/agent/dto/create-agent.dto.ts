import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateAgentDto {
  @IsString()
  name: string;

  @IsPhoneNumber('BD')
  contact: string;

  @IsString()
  affiliation: string;
}
