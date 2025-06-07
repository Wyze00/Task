import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AuthRequest, AuthResponse } from '@app/contract';
import { ValidationService } from '@app/common';
import { JwtService } from '@nestjs/jwt';
import { AuthValidation } from './auth.validation';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly validationService: ValidationService,
        private readonly jwtService: JwtService,
    ) {}

    async create(request: AuthRequest): Promise<void> {
        await this.prismaService.userAuth.create({
            data: {
                username: request.username,
                password: request.password,
            },
        });
    }

    async login(loginRequest: AuthRequest): Promise<AuthResponse> {
        const request: AuthRequest = this.validationService.validate(
            AuthValidation.LOGIN,
            loginRequest,
        );

        const user = await this.prismaService.userAuth.findUnique({
            where: {
                username: request.username,
            },
        });

        if (!user) {
            throw new RpcException('Usename or Password wrong');
        }

        const isValidPassword = await bcrypt.compare(
            request.password,
            user.password,
        );

        if (!isValidPassword) {
            throw new RpcException('Usename or Password wrong');
        }

        const token = this.jwtService.sign(
            { username: user.username },
            { expiresIn: '1h' },
        );

        return {
            username: user.username,
            token,
        };
    }
}
