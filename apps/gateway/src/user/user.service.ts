import { CreateUserRequestDto, UserResponseDto } from '@app/contract';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_CLIENT') private readonly userClient: ClientProxy,
    ) {}

    async create(request: CreateUserRequestDto): Promise<UserResponseDto> {
        try {
            const resp = await lastValueFrom<UserResponseDto>(
                this.userClient.send('user.create', request),
            );

            return resp;
        } catch (e: any) {
            throw new HttpException(e, 400);
        }
    }
}
