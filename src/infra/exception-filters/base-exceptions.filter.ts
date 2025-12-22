import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BaseException } from '@libs/exceptions';
import { Request, Response } from 'express';

@Catch(BaseException)
export class BaseExceptionsFilter implements ExceptionFilter {
  catch(exception: BaseException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const error = exception.toHttpResponse();

    return response.status(error.statusCode).json(error);
  }
}
