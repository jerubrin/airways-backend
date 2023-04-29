import { ApiProperty } from '@nestjs/swagger';

export class TokenRes {
  @ApiProperty({
    example: 'XXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXX.XXXXXXXXX',
    description: "Return user's JWT token",
  })
  readonly token: string;
}
