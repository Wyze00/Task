import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

async function bootstrap() {
    const app = await NestFactory.create(UserModule);
    const configService: ConfigService = app.get(ConfigService);

    const port: number = configService.get<number>('PORT') || 3002;
    const host: string = configService.get<string>('HOST') || 'localhost';

    const microservices =
        await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
            transport: Transport.TCP,
            options: {
                host: host,
                port: port,
            },
        });

    const logger: Logger = microservices.get(WINSTON_MODULE_NEST_PROVIDER);
    microservices.useLogger(logger);

    logger.debug(`User start at : ${port} ${host}`);
    await microservices.listen();
}
bootstrap();
