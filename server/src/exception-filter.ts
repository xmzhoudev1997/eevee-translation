import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { throwError } from 'rxjs';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    if (!request.headers) {
      return throwError(() => typeof exception === 'object' ? JSON.stringify(exception) : exception);
    }
    response.status(500).json(exception);
  }
}