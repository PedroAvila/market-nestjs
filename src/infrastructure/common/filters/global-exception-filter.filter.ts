import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { BusinessException } from '../exceptions/business-exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let details: any = undefined;
    let errors: string[] = [];

    if (exception instanceof BusinessException) {
      statusCode = exception.code;
      message = exception.message;
      details = exception.details;
    }

    if (this.isValidationError(exception)) {
      const { statusCode, responseBody } = this.handleValidationError(
        exception as BadRequestException,
        request,
      );
      httpAdapter.reply(response, responseBody, statusCode);
      return;
    }

    // Manejo de BadRequestException (incluye ParseUUIDPipe y validaciones DTO)
    else if (exception instanceof BadRequestException) {
      statusCode = HttpStatus.BAD_REQUEST;
      const exceptionResponse = exception.getResponse();

      // Preservar mensaje original del pipe
      if (typeof exceptionResponse === 'object') {
        message = Array.isArray(exceptionResponse['message'])
          ? exceptionResponse['message'][0] // Tomar el primer mensaje de error
          : exceptionResponse['message'] || 'Invalid request';
      } else {
        message = exceptionResponse;
      }
    }

    // Manejo de otras HttpExceptions
    else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception.message;
    }
    // Manejo de errores inesperados
    else if (exception instanceof Error) {
      message = exception.message;
    }

    const responseBody = {
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...(details && { details }),
    };

    // Log completo solo para errores 500
    if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `Unhandled Exception: ${exception instanceof Error ? exception.stack : exception}`,
      );
    }

    httpAdapter.reply(response, responseBody, statusCode);
  }

  private isValidationError(exception: unknown): boolean {
    if (exception instanceof BadRequestException) {
      const response = exception.getResponse();
      return (
        Array.isArray(response['message']) &&
        response['message'].every((msg: any) => typeof msg === 'string')
      );
    }
    return false;
  }

  private handleValidationError(
    exception: BadRequestException,
    request: any,
  ): {
    statusCode: number;
    responseBody: any;
  } {
    const exceptionResponse = exception.getResponse();
    const messages = Array.isArray(exceptionResponse['message'])
      ? exceptionResponse['message']
      : [exceptionResponse['message']];

    return {
      statusCode: HttpStatus.BAD_REQUEST,
      responseBody: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Validation failed',
        errors: messages,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    };
  }
}
