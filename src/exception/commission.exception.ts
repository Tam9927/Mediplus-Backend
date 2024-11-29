// import { HttpException, HttpStatus } from '@nestjs/common';

// export class CommissionNotFoundException extends HttpException {
//   constructor(id: number) {
//     super(`Commission with ID ${id} not found`, HttpStatus.NOT_FOUND);
//   }
// }

// export class CommissionCreateFailedException extends HttpException {
//   constructor(message: string = `Failed to update commission with ID`) {
//     super('Failed to create commission', HttpStatus.BAD_REQUEST);
//   }
// }

// export class CommissionUpdateFailedException extends HttpException {
//   constructor(id: number) {
//     super(`Failed to update commission with ID ${id}`, HttpStatus.BAD_REQUEST);
//   }
// }

// export class CommissionDeleteFailedException extends HttpException {
//   constructor(id: number) {
//     super(`Failed to delete commission with ID ${id}`, HttpStatus.BAD_REQUEST);
//   }
// }

// module.exports={CommissionCreateFailedException,CommissionDeleteFailedException,CommissionUpdateFailedException,CommissionNotFoundException}

import { HttpException, HttpStatus } from '@nestjs/common';

export class CommissionNotFoundException extends HttpException {
  constructor(id: number) {
    super(`Commission with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class CommissionCreateFailedException extends HttpException {
  constructor(message: string = 'Failed to create commission') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class CommissionUpdateFailedException extends HttpException {
  constructor(id: number, message: string = 'Failed to update commission') {
    super(`Commission with ID ${id}: ${message}`, HttpStatus.BAD_REQUEST);
  }
}

export class CommissionDeleteFailedException extends HttpException {
  constructor(id: number, message: string = 'Failed to delete commission') {
    super(`Commission with ID ${id}: ${message}`, HttpStatus.BAD_REQUEST);
  }
}

module.exports={CommissionCreateFailedException,CommissionDeleteFailedException,CommissionUpdateFailedException,CommissionNotFoundException}
