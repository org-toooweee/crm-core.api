import { BaseException } from '@libs/exceptions/exception.base';

export class ArgumentInvalidException extends BaseException {
  readonly code = 400;

  constructor(
    message = 'Invalid argument provided',
    metadata?: Record<string, unknown>,
  ) {
    super(message, metadata);
  }
}

export class ArgumentOutOfRangeException extends BaseException {
  readonly code = 422;

  constructor(
    message = 'Argument is out of allowed range',
    metadata?: Record<string, unknown>,
  ) {
    super(message, metadata);
  }
}

export class NotFoundException extends BaseException {
  readonly code = 404;

  constructor(
    message = 'Resource not found',
    metadata?: Record<string, unknown>,
  ) {
    super(message, metadata);
  }
}

export class ConflictException extends BaseException {
  readonly code = 409;

  constructor(
    message = 'Resource conflict occurred',
    metadata?: Record<string, unknown>,
  ) {
    super(message, metadata);
  }
}

export class UnauthorizedException extends BaseException {
  readonly code = 401;

  constructor(
    message = 'Unauthorized access',
    metadata?: Record<string, unknown>,
  ) {
    super(message, metadata);
  }
}

export class ForbiddenException extends BaseException {
  readonly code = 403;

  constructor(
    message = 'Forbidden access',
    metadata?: Record<string, unknown>,
  ) {
    super(message, metadata);
  }
}

export class ValidationException extends BaseException {
  readonly code = 422;

  constructor(
    public readonly errors: string[] | Record<string, string[]>,
    message = 'Validation failed',
  ) {
    super(message, { errors });
  }
}

export class BadRequestException extends BaseException {
  readonly code = 400;

  constructor(message = 'Bad request', metadata?: Record<string, unknown>) {
    super(message, metadata);
  }
}
