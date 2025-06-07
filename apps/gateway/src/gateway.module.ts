import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from 'libs/common/middleware/logger.middleware';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        CommonModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'apps/gateway/.env',
        }),
        UserModule,
        AuthModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: '1h',
                },
            }),
            inject: [ConfigService],
            global: true,
        }),
    ],
})
export class GatewayModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
