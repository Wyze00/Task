import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
    const app = await NestFactory.create(AuthModule);
    const configService: ConfigService = app.get(ConfigService);

    const port = configService.get<number>('PORT') || 3001;
    const host = configService.get<string>('HOST') || 'localhost';
    const rmq =
        configService.get<string>('RABBITMQ_URL') ||
        'amqp://guest:guest@localhost:5672/task';

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [rmq],
            queue: 'user_event',
            queueOptions: {
                durable: true,
            },
            exchange: 'user',
            exchangeType: 'direct',
        },
    });

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: {
            port,
            host,
        },
    });

    const logger: Logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
    app.useLogger(logger);

    logger.debug(
        `Auth Service started at TCP ${host}:${port} and listening for RabbitMQ events`,
    );

    await app.startAllMicroservices();
}
bootstrap();
