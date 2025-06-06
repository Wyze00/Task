import { Controller, Get } from '@nestjs/common';

@Controller()
export class GatewayController {
    @Get()
    hello(): string {
        return 'hello';
    }
}
