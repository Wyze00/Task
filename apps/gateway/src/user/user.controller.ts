import { UserResponse, WebResponse } from '@app/contract';
import { Controller, Get, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(200)
    getUser(): WebResponse<UserResponse> {
        return {
            data: {
                username: 'test',
                name: 'mock',
            },
        };
    }
}
