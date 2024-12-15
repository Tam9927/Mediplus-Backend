import { IsString, IsNotEmpty } from 'class-validator';

export class LoginManagerDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
  