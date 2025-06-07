import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'USER_CLIENT',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (config: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host:
                            config.get<string>('USER_CLIENT_HOST') ||
                            'localhost',
                        port: config.get<number>('USER_CLIENT_PORT') || 3001,
                    },
                }),
            },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
