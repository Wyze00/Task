import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class MicroserviceLogInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctxType = context.getType(); // Should be 'rpc' in microservices
        const rpcContext = context.switchToRpc();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = rpcContext.getData();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const pattern = rpcContext.getContext();

        console.log(`→ [${ctxType}] Pattern: ${pattern}`);
        console.log('→ Payload:', data);

        const now = Date.now();

        return next.handle().pipe(
            tap((response) => {
                console.log(
                    `← [${ctxType}] Pattern: ${pattern} | Duration: ${
                        Date.now() - now
                    }ms`,
                );
                console.log('← Response:', response);
            }),
        );
    }
}
