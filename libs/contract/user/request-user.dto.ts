import { Request } from 'express';

export interface RequestUser extends Request {
    username?: string;
}
