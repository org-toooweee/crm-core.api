import { BaseException } from '@libs/exceptions/exception.base';

export class ArgumentInvalidException extends BaseException {
  readonly code = 'ARGUMENT_INVALID';

  constructor(
    message = 'Invalid argument provided',
    metadata?: Record<string, unknown>,
  ) {
    super(message, metadata);
  }
}

export class ArgumentOutOfRangeException extends BaseException {
  readonly code = 'ARGUMENT_OUT_OF_RANGE';

  constructor(
    message = 'Argument is out of allowed range',
    metadata?: Record<string, unknown>,
  ) {
    super(message, metadata);
  }
}

export class NotFoundException extends BaseException {
  readonly code = 'NOT_FOUND';

  constructor(
    message = 'Resource not found',
    metadata?: Record<string, unknown>,
  ) {
    super(message, metadata);
  }
}

export class ConflictException extends BaseException {
  readonly code = 'CONFLICT';

  constructor(
    message = 'Resource conflict occurred',
    metadata?: Record<string, unknown>,
  ) {
    super(message, metadata);
  }
}

export class UnauthorizedException extends BaseException {
  readonly code = 'UNAUTHORIZED';

  constructor(
    message = 'Unauthorized access',
    metadata?: Record<string, unknown>,
  ) {
    super(message, metadata);
  }
}

export class ForbiddenException extends BaseException {
  readonly code = 'FORBIDDEN';

  constructor(
    message = 'Forbidden access',
    metadata?: Record<string, unknown>,
  ) {
    super(message, metadata);
  }
}

export class ValidationException extends BaseException {
  readonly code = 'VALIDATION_FAILED';

  constructor(
    public readonly errors: string[] | Record<string, string[]>,
    message = 'Validation failed',
  ) {
    super(message, { errors });
  }
}

export class BadRequestException extends BaseException {
  readonly code = 'BAD_REQUEST';

  constructor(message = 'Bad request', metadata?: Record<string, unknown>) {
    super(message, metadata);
  }
}
