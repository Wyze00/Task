import {
    Catch,
    HttpException,
    ExceptionFilter,
    ArgumentsHost,
} from '@nestjs/common';
import { ZodError } from 'zod';
import { Response } from 'express';

@Catch(HttpException, ZodError)
export class ErrorFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const response: Response = host.switchToHttp().getResponse();

        if (exception instanceof HttpException) {
            response.status(exception.getStatus()).json({
                errors: exception.getResponse(),
            });
        } else if (exception instanceof ZodError) {
            response.status(400).json({
                errors: exception.message,
            });
        } else {
            response.status(500).json({
                errors: exception.message,
            });
        }
    }
}
