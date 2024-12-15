import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAgentDto {
  @ApiProperty({ description: 'Name of the agent', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Contact number of the agent', example: '+8801234567890' })
  @IsPhoneNumber('BD')
  @IsNotEmpty()
  contact: string;

  @ApiProperty({ description: 'Affiliation of the agent', example: 'Mediplus Ltd.' })
  @IsString()
  affiliation: string;
}

export class UpdateAgentDto {
  @ApiProperty({ description: 'Name of the agent', example: 'John Doe', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Contact number of the agent', example: '+8801234567890', required: false })
  @IsPhoneNumber('BD')
  @IsOptional()
  contact?: string;

  @ApiProperty({ description: 'Affiliation of the agent', example: 'Mediplus Ltd.', required: false })
  @IsString()
  @IsOptional()
  affiliation?: string;
}
