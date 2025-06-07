import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from 'libs/common/middleware/logger.middleware';
import { GatewayController } from './gateway.controller';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        CommonModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'apps/gateway/.env',
        }),
        UserModule,
    ],
    controllers: [GatewayController],
})
export class GatewayModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
