import { CreateUserRequestDto, UserResponseDto } from '@app/contract';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_CLIENT') private readonly userClient: ClientProxy,
    ) {}

    async create(request: CreateUserRequestDto): Promise<UserResponseDto> {
        const resp = await lastValueFrom<UserResponseDto>(
            this.userClient.send('user.create', request),
        );

        return resp;
    }
}
