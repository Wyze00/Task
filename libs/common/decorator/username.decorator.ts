import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestUser } from 'libs/contract/user/request-user.dto';

export const Username = createParamDecorator(
    (data: unknown, context: ExecutionContext): string => {
        const request: RequestUser = context.switchToHttp().getRequest();
        return request.username!;
    },
);
