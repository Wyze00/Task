import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AuthRequest } from '@app/contract';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @EventPattern('user.create')
    async create(@Payload() data: AuthRequest): Promise<void> {
        await this.authService.create(data);
    }
}
