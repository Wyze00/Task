import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserRequestDto, UserResponseDto } from '@app/contract';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern('user.create')
    async create(
        @Payload() userCreateRequest: CreateUserRequestDto,
    ): Promise<UserResponseDto> {
        return await this.userService.create(userCreateRequest);
    }
}
