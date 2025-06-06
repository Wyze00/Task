import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
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
    controllers: [GatewayController],
    providers: [GatewayService],
})
export class GatewayModule {}
