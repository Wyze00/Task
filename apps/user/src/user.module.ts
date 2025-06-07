import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@app/common';
import { PrismaService } from './prisma.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'apps/user/.env',
        }),
        CommonModule,
    ],
    controllers: [UserController],
    providers: [UserService, PrismaService],
})
export class UserModule {}
