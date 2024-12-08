import { IsString, IsNotEmpty } from 'class-validator';

export class TestCategoryDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}


  