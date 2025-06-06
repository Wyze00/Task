import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ValidationService } from './validation.service';

@Global()
@Module({
    imports: [
        WinstonModule.forRoot({
            format: winston.format.json(),
            transports: [new winston.transports.Console()],
        }),
    ],
    providers: [ValidationService],
    exports: [ValidationService],
})
export class CommonModule {}
