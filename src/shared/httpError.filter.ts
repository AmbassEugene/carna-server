import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message: exception.message,
    };

    Logger.error(
      `${exception.message}`,
      JSON.stringify(errorResponse),
      'ExceptionFilter',
    );

    response.status(status).json(errorResponse);
  }
}
