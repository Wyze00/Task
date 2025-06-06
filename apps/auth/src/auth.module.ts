import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@app/common';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'apps/auth/.env',
        }),
        CommonModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
