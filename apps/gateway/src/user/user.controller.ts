import {
    CreateUserRequestDto,
    UserResponseDto,
    WebResponse,
} from '@app/contract';
import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'libs/common/guard/auth.guard';
import { Username } from 'libs/common/decorator/username.decorator';

@ApiTags('User API')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(AuthGuard)
    @HttpCode(200)
    getUser(@Username() username: string): WebResponse<UserResponseDto> {
        return {
            data: {
                username: username,
                name: 'mock',
            },
        };
    }

    @ApiOperation({ summary: 'Create new user' })
    @ApiCreatedResponse({
        description: 'User successfuly created',
        type: UserResponseDto,
    })
    @Post()
    @HttpCode(201)
    async createUser(
        @Body() request: CreateUserRequestDto,
    ): Promise<WebResponse<UserResponseDto>> {
        const response = await this.userService.create(request);

        return {
            data: response,
        };
    }
}
