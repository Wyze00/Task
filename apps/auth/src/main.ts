import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
    const app = await NestFactory.create(AuthModule);
    const configService: ConfigService = await app.get(ConfigService);

    const port: number = configService.get<number>('PORT') || 3001;
    const host: string = configService.get<string>('HOST') || 'localhost';

    const microservice =
        await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
            transport: Transport.TCP,
            options: {
                port,
                host,
            },
        });

    const logger: Logger = microservice.get(WINSTON_MODULE_NEST_PROVIDER);
    microservice.useLogger(logger);

    await microservice.listen();
}

bootstrap();
