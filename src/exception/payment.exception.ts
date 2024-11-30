import { HttpException, HttpStatus } from '@nestjs/common';

export class PaymentNotFoundException extends HttpException {
  constructor(id: number) {
    super(`Payment with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class PaymentCreateFailedException extends HttpException {
  constructor(message: string = 'Failed to create payment') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class PaymentUpdateFailedException extends HttpException {
  constructor(id: number, message: string = 'Failed to update payment') {
    super(`Payment with ID ${id}: ${message}`, HttpStatus.BAD_REQUEST);
  }
}

export class PaymentDeleteFailedException extends HttpException {
  constructor(id: number, message: string = 'Failed to delete payment') {
    super(`Payment with ID ${id}: ${message}`, HttpStatus.BAD_REQUEST);
  }
}

// Exporting the custom exceptions
module.exports = {
  PaymentCreateFailedException,
  PaymentDeleteFailedException,
  PaymentUpdateFailedException,
  PaymentNotFoundException
};
