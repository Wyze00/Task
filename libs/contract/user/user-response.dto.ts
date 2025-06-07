import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty({ example: 'Dummy', minLength: 1, maxLength: 100 })
    username: string;
    @ApiProperty({ example: 'Dummy', minLength: 1, maxLength: 100 })
    name: string;
}
