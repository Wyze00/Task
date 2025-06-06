import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import winston from 'winston';
import { ConfigModule } from '@nestjs/config';
import { ValidationService } from './validation.service';

@Global()
@Module({
    imports: [
        WinstonModule.forRoot({
            format: winston.format.json(),
            transports: [new winston.transports.Console()],
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    providers: [ValidationService],
    exports: [ValidationService],
})
export class CommonModule {}
