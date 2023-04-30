import { ApiProperty } from '@nestjs/swagger';

export class TokenRes {
  @ApiProperty({
    example: 'XXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXX.XXXXXXXXX',
    description: "User's JWT token",
  })
  readonly token: string;
}
