import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import { ErrorFilter } from 'libs/common/filter/error.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(GatewayModule);

    const logger: Logger = app.get<any, Logger>(WINSTON_MODULE_NEST_PROVIDER);
    app.useLogger(logger);

    const port: number | undefined =
        app.get(ConfigService).get<number | undefined>('PORT') || 3000;

    app.useGlobalFilters(new ErrorFilter());

    const config = new DocumentBuilder()
        .setTitle('Task App')
        .setDescription('Simple application for making task and note')
        .setVersion('1.0.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(port);
}
bootstrap();
