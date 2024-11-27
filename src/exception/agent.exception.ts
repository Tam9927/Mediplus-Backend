import { HttpException, HttpStatus } from '@nestjs/common';

export class AgentNotFoundException extends HttpException {
  constructor(id: number) {
    super(`Agent with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class AgentCreateFailedException extends HttpException {
  constructor() {
    super('Failed to create agent', HttpStatus.BAD_REQUEST);
  }
}

export class AgentUpdateFailedException extends HttpException {
  constructor(id: number) {
    super(`Failed to update agent with ID ${id}`, HttpStatus.BAD_REQUEST);
  }
}

export class AgentDeleteFailedException extends HttpException {
  constructor(id: number) {
    super(`Failed to delete agent with ID ${id}`, HttpStatus.BAD_REQUEST);
  }
}

module.exports={AgentNotFoundException,AgentCreateFailedException,AgentUpdateFailedException,AgentDeleteFailedException}