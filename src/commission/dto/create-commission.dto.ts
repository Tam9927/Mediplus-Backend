import { IsNumber, IsOptional, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommissionDto {
  @IsOptional()
  @IsNumber()
  doctorId?: number;

  @IsOptional()
  @IsNumber()
  agentId?: number;

  @IsNumber()
  @IsNotEmpty()
  percentage!: number;

  @IsEnum(['daily', 'monthly'])
  duration!: string;


  @IsOptional()
  @IsString()
  @IsEnum(['Doctor', 'Agent'])
  targetType?: 'Doctor' | 'Agent';
}
