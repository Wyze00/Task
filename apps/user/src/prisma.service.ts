import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/user-client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class PrismaService
    extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
    implements OnModuleInit
{
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {
        super({
            log: [
                { emit: 'event', level: 'info' },
                { emit: 'event', level: 'query' },
                { emit: 'event', level: 'warn' },
                { emit: 'event', level: 'error' },
            ],
        });
    }

    onModuleInit() {
        this.$on('info', (e: Prisma.LogEvent) => this.logger.info(e));
        this.$on('query', (e: Prisma.QueryEvent) => this.logger.info(e));
        this.$on('warn', (e: Prisma.LogEvent) => this.logger.warn(e));
        this.$on('error', (e: Prisma.LogEvent) => this.logger.error(e));
    }
}
