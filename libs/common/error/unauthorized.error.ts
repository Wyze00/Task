import { HttpException } from '@nestjs/common';

export class UnauthorizedError extends HttpException {
    constructor() {
        super('Unauthorized', 401);
    }
}
