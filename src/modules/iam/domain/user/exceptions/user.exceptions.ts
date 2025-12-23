import { BaseException } from '@libs/exceptions';

export class UserAlreadyExistsException extends BaseException {
  code = 409;

  constructor() {
    super('User already exists');
  }
}

export class InvalidCredentialsException {}
