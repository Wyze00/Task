import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequestDto {
    @ApiProperty({ example: 'Asep23', minimum: 1, maximum: 100 })
    username: string;
    @ApiProperty({ example: 'Asep', minimum: 1, maximum: 100 })
    name: string;
    @ApiProperty({ example: 'rahasia', minimum: 1, maximum: 100 })
    password: string;
}
