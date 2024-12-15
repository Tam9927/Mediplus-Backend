import { IsString, IsNotEmpty } from 'class-validator';

export class CreateManagerDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}