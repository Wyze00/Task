import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AuthModule);
    const configService: ConfigService = await app.get(ConfigService);

    const port = configService.get<number>('PORT') || 3001;
    const host = configService.get<string>('HOST') || 'localhost';

    const microservice =
        await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
            transport: Transport.TCP,
            options: {
                port,
                host,
            },
        });

    await microservice.listen();
}
bootstrap();
