import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@app/common';
import { PrismaService } from './prisma.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'apps/auth/.env',
        }),
        CommonModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService],
})
export class AuthModule {}
