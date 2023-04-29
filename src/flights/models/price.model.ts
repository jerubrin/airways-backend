import { ApiProperty } from '@nestjs/swagger';

export class Price {
  @ApiProperty({
    example: 250,
    description: 'Ticket(s) price in Euro',
  })
  eur: number;

  // 1.1031
  @ApiProperty({
    example: 275.79,
    description: 'Ticket(s) price in US Dollar',
  })
  usd: number;

  // 88.47
  @ApiProperty({
    example: 22118.03,
    description: 'Ticket(s) price in Rubles',
  })
  rub: number;

  // 4.59
  @ApiProperty({
    example: 1147.52,
    description: 'Ticket(s) price in poland zloty',
  })
  pln: number;
}
