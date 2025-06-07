import { AuthRequest, AuthResponse, WebResponse } from '@app/contract';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(200)
    async login(
        @Body() request: AuthRequest,
    ): Promise<WebResponse<AuthResponse>> {
        const response: AuthResponse = await this.authService.login(request);

        return {
            data: response,
        };
    }
}
