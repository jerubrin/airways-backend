import { ApiProperty } from '@nestjs/swagger';

export class Seats {
  @ApiProperty({
    example: 90,
    description: 'Number of empty seats on the plane',
  })
  avaible: number;

  @ApiProperty({
    example: 200,
    description: 'The total number of seats on the plane',
  })
  total: number;
}
