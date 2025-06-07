import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register({
            clients: [
                {
                    name: 'USER_CLIENT',
                    transport: Transport.TCP,
                    options: {
                        port: 3002,
                    },
                },
            ],
        }),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
