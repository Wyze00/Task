import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateUserRequestDto, UserResponseDto } from '@app/contract';
import { User } from '@prisma/user-client';
import { UserValidation } from './user.validation';
import { ValidationService } from '@app/common';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly validationService: ValidationService,
    ) {}

    getHello(): string {
        return 'Hello World!';
    }

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
                password: request.password,
                username: request.username,
            },
        });

        const response: UserResponseDto = {
            name: user.name,
            username: user.username,
        };

        return response;
    }
}
