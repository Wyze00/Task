import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class WebResponse<T> {
    @ApiProperty({
        example: { name: 'dummy', username: 'dummy' },
        required: false,
    })
    data?: T;
    @ApiPropertyOptional({ example: 'Unautorized' })
    errors?: string;
}
