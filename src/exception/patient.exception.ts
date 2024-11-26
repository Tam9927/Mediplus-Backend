import { HttpException, HttpStatus } from '@nestjs/common';

export class PatientNotFoundException extends HttpException {
  constructor(id: number) {
    super(`Patient with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class PatientUpdateFailedException extends HttpException {
  constructor(id: number) {
    super(`Failed to update patient with ID ${id}`, HttpStatus.BAD_REQUEST);
  }
}

export class PatientDeleteFailedException extends HttpException {
  constructor(id: number) {
    super(`Failed to delete patient with ID ${id}`, HttpStatus.BAD_REQUEST);
  }
}

export class PatientCreateFailedException extends HttpException {
  constructor() {
    super('Failed to create patient', 400);
  }
}

module.exports = {PatientCreateFailedException,PatientDeleteFailedException,PatientNotFoundException,PatientUpdateFailedException}