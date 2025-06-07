import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateUserRequestDto, UserResponseDto } from '@app/contract';
import { User } from '@prisma/user-client';
import { UserValidation } from './user.validation';
import { ValidationService } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly validationService: ValidationService,
        @Inject('USER_EVENT_CLIENT')
        private readonly eventClient: ClientProxy,
    ) {}

    async create(
        userCreateRequest: CreateUserRequestDto,
    ): Promise<UserResponseDto> {
        const request: CreateUserRequestDto = this.validationService.validate(
            UserValidation.CREATE,
            userCreateRequest,
        );

        const user: User = await this.prismaService.user.create({
            data: {
                name: request.name,
                password: await bcrypt.hash(request.password, 10),
                username: request.username,
            },
        });

        const response: UserResponseDto = {
            name: user.name,
            username: user.username,
        };

        this.eventClient.emit('user.create', {
            username: user.username,
            password: user.password,
        });

        return response;
    }
}
