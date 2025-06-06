import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import { ErrorFilter } from 'libs/common/filter/error.filter';

async function bootstrap() {
    const app = await NestFactory.create(GatewayModule);

    const logger: Logger = app.get<any, Logger>(WINSTON_MODULE_NEST_PROVIDER);
    app.useLogger(logger);

    const port: number | undefined =
        app.get(ConfigService).get<number | undefined>('PORT') || 3000;

    app.useGlobalFilters(new ErrorFilter());

    await app.listen(port);
}
bootstrap();
