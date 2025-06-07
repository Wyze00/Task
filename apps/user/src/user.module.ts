import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from '@app/common';
import { PrismaService } from './prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'apps/user/.env',
        }),
        CommonModule,
        ClientsModule.registerAsync([
            {
                name: 'USER_EVENT_CLIENT',
                imports: [ConfigModule],
                useFactory: (config: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [
                            config.get<string>('RABBITMQ_URL') ||
                                'amqp://localhost:5672/task',
                        ],
                        queue: 'Create User',
                        queueOptions: {
                            durable: true,
                        },
                        exchange: 'user',
                    },
                }),
                inject: [ConfigService],
            },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService, PrismaService],
})
export class UserModule {}
