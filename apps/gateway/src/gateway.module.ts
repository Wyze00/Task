import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from 'libs/common/middleware/logger.middleware';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        CommonModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'apps/gateway/.env',
        }),
        UserModule,
        AuthModule,
    ],
})
export class GatewayModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
