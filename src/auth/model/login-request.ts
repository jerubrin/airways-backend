import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({
    example: '',
    description: '',
  })
  readonly email: string;

  @ApiProperty({
    example: '',
    description: '',
  })
  readonly password: string;
}
