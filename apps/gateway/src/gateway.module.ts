import { Module } from '@nestjs/common';
import { CommonModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        CommonModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'apps/gateway/.env',
        }),
    ],
})
export class GatewayModule {}
