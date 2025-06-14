import { HttpStatus } from '@nestjs/common';

export class BusinessException extends Error {
  constructor(
    public readonly message: string,
    public readonly code: HttpStatus,
    public readonly details?: Record<string, any>,
  ) {
    super(message);
    // this.code = code;
    // this.details = details;

    // Fija el prototipo correctamente
    Object.setPrototypeOf(this, BusinessException.prototype);
    //this.name = 'BusinessException';
  }
}
