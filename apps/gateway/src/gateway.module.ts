import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from 'libs/common/middleware/logger.middleware';
import { GatewayController } from './gateway.controller';

@Module({
    imports: [
        CommonModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'apps/gateway/.env',
        }),
    ],
    controllers: [GatewayController],
})
export class GatewayModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
