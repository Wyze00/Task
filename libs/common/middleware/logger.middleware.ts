import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}

    use(req: Request, res: Response, next: (error?: any) => void) {
        this.logger.debug(`[Request] : ${req.path}`);
        next();
    }
}
