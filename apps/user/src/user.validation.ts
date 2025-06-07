import { CreateUserRequestDto } from '@app/contract';
import { Injectable } from '@nestjs/common';
import { z, ZodType } from 'zod';

@Injectable()
export class UserValidation {
    static readonly CREATE: ZodType<CreateUserRequestDto> = z.object({
        username: z.string().min(1).max(100),
        name: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
    });
}
