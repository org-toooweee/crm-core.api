export abstract class BaseException extends Error {
  abstract readonly code: number;

  protected constructor(
    readonly message: string,
    public readonly metadata?: Record<string, unknown>,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace?.(this, this.constructor);
  }

  toHttpResponse() {
    return {
      message: this.message,
      statusCode: this.code,
      error: this.name,
      ...(this.metadata && { metadata: this.metadata }),
    };
  }
}
