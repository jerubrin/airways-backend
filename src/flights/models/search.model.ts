import { ApiProperty } from '@nestjs/swagger';

export class SearchFlights {
  @ApiProperty({
    example: 'AMS',
    description: 'Internation airport code',
  })
  fromKey: string;

  @ApiProperty({
    example: 'MAD',
    description: 'Internation airport code',
  })
  toKey: string;

  @ApiProperty({
    example: '2023-09-21T00:00:00.000Z',
    description: 'Date of flight',
  })
  forwardDate: string;

  @ApiProperty({
    example: '2023-10-11T00:00:00.000Z',
    description: 'Date of flight (optional)',
  })
  backDate?: string;
}
