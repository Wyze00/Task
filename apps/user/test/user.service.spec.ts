/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/user.service';
import { PrismaService } from '../src/prisma.service';
import { ValidationService } from '@app/common';
import { CreateUserRequestDto, UserResponseDto } from '@app/contract';
import { ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { UserValidation } from '../src/user.validation';

jest.mock('bcrypt'); // Mocking bcrypt

describe('UserService', () => {
    let service: UserService;
    let prisma: PrismaService;
    let validator: ValidationService;
    let client: ClientProxy;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: PrismaService,
                    useValue: {
                        user: {
                            create: jest.fn(),
                        },
                    },
                },
                {
                    provide: ValidationService,
                    useValue: {
                        validate: jest.fn(),
                    },
                },
                {
                    provide: 'USER_EVENT_CLIENT',
                    useValue: {
                        emit: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        prisma = module.get<PrismaService>(PrismaService);
        validator = module.get<ValidationService>(ValidationService);
        client = module.get<ClientProxy>('USER_EVENT_CLIENT');
    });

    it('should validate input, hash password, create user, emit event, and return response', async () => {
        const request: CreateUserRequestDto = {
            name: 'John Doe',
            username: 'john',
            password: 'plain123',
        };

        const validated = { ...request };
        const hashedPassword = 'hashed123';
        const createdUser = { ...validated, password: hashedPassword };

        (validator.validate as jest.Mock).mockReturnValue(validated);
        (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
        (prisma.user.create as jest.Mock).mockResolvedValue(createdUser);

        const result = await service.create(request);

        const expected: UserResponseDto = {
            name: 'John Doe',
            username: 'john',
        };

        expect(result).toEqual(expected);
        expect(validator.validate).toHaveBeenCalledWith(
            UserValidation.CREATE,
            request,
        );
        expect(bcrypt.hash).toHaveBeenCalledWith('plain123', 10);
        expect(prisma.user.create).toHaveBeenCalledWith({
            data: {
                name: 'John Doe',
                username: 'john',
                password: hashedPassword,
            },
        });
        expect(client.emit).toHaveBeenCalledWith('user.create', {
            username: 'john',
            password: hashedPassword,
        });
    });
});
