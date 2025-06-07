import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AuthRequest } from '@app/contract';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(request: AuthRequest): Promise<void> {
        await this.prismaService.userAuth.create({
            data: {
                username: request.username,
                password: request.password,
            },
        });
    }
}
