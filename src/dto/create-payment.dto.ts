import { IsNumber, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  patientId: number;  // Patient ID related to the payment

  @IsNumber()
  @IsNotEmpty()
  doctorId: number;   // Doctor ID associated with the payment

  @IsNumber()
  @IsNotEmpty()
  amount: number;     // The amount of the payment

  @IsDateString()
  @IsNotEmpty()
  paymentDate: string;  // The date the payment was made

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  agentId: number;  // The agent who processed the payment (if applicable)

  @IsNumber()
  status: number;   // Status of the payment (e.g., 1 for successful, 0 for pending, etc.)
}
