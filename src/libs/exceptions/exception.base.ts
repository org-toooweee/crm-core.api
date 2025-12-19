export abstract class BaseException extends Error {
  abstract readonly code: string;

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
      error: this.name,
      message: this.message,
      code: this.code,
      ...(this.metadata && { metadata: this.metadata }),
    };
  }
}
