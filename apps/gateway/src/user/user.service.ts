import { CreateUserRequestDto, UserResponseDto } from '@app/contract';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_CLIENT') private readonly userClient: ClientProxy,
    ) {}

    create(request: CreateUserRequestDto): Observable<UserResponseDto> {
        return this.userClient.send<UserResponseDto>('users.create', request);
    }
}
