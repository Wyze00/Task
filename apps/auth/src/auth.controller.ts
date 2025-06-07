import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthRequest, AuthResponse } from '@app/contract';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @EventPattern('user.create')
    async create(@Payload() data: AuthRequest): Promise<void> {
        await this.authService.create(data);
    }

    @MessagePattern('auth.login')
    async login(@Payload() data: AuthRequest): Promise<AuthResponse> {
        return await this.authService.login(data);
    }
}
