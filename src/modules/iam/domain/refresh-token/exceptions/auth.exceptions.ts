import { BaseException } from '@libs/exceptions';

export class InvalidCredentialsException extends BaseException {
  code = 401;

  constructor() {
    super('Invalid credentials');
  }
}

export class RefreshTokenExpiredException extends BaseException {
  code = 401;

  constructor() {
    super('Unauthorized');
  }
}

export class RefreshTokenNotFoundException extends RefreshTokenExpiredException {}
