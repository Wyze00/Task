import {
    CreateUserRequestDto,
    UserResponseDto,
    WebResponse,
} from '@app/contract';
import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(200)
    getUser(): WebResponse<UserResponseDto> {
        return {
            data: {
                username: 'test',
                name: 'mock',
            },
        };
    }

    @Post()
    @HttpCode(200)
    async createUser(
        @Body() request: CreateUserRequestDto,
    ): Promise<WebResponse<UserResponseDto>> {
        const response = await this.userService.create(request);

        return {
            data: response,
        };
    }
}
