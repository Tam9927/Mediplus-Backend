import { HttpException, HttpStatus } from '@nestjs/common';

export class DoctorNotFoundException extends HttpException {
  constructor(id: number) {
    super(`Doctor with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class DoctorUpdateFailedException extends HttpException {
  constructor(id: number) {
    super(`Failed to update doctor with ID ${id}`, HttpStatus.BAD_REQUEST);
  }
}

export class DoctorDeleteFailedException extends HttpException {
  constructor(id: number) {
    super(`Failed to delete doctor with ID ${id}`, HttpStatus.BAD_REQUEST);
  }
}

export class DoctorCreateFailedException extends HttpException {
  constructor() {
    super('Failed to create doctor', 400);
  }
}

module.exports = {
  DoctorCreateFailedException,
  DoctorDeleteFailedException,
  DoctorNotFoundException,
  DoctorUpdateFailedException,
};
