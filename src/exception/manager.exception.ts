
import { HttpException,HttpStatus } from "@nestjs/common";

export class ManagerAlreadyExistsException extends HttpException {
  constructor(username) {
    super(`Manager with username "${username}" already exists`, HttpStatus.CONFLICT);
  }
}

export class ManagerAuthenticationFailedException extends HttpException {
  constructor(username) {
    super(`Authentication failed for username "${username}"`, HttpStatus.UNAUTHORIZED);
  }
}  

module.exports = {
  ManagerAlreadyExistsException,
  ManagerAuthenticationFailedException,
};   
