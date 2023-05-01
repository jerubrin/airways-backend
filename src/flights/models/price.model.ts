import { ApiProperty } from '@nestjs/swagger';

export class Price {
  constructor(euro: number) {
    this.eur = euro;
    this.usd = this.eur * 1.1031;
    this.rub = this.eur * 88.47;
    this.pln = this.eur * 4.59;
  }

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
