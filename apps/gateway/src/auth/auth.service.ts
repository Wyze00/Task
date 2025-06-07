import { AuthRequest, AuthResponse } from '@app/contract';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_CLIENT') private readonly authClient: ClientProxy,
    ) {}

    async login(request: AuthRequest): Promise<AuthResponse> {
        try {
            const response = await lastValueFrom<AuthResponse>(
                this.authClient.send('auth.login', request),
            );

            return response;
        } catch (e: any) {
            throw new HttpException(e, 400);
        }
    }
}
