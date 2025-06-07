import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'AUTH_CLIENT',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (config: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host:
                            config.get<string>('AUTH_CLIENT_HOST') ||
                            'localhost',
                        port: config.get<number>('AUTH_CLIENT_PORT') || 3001,
                    },
                }),
            },
        ]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
