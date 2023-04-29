import { ApiProperty } from '@nestjs/swagger';

export class Airport {
  @ApiProperty({
    example: 'AMS',
    description: 'Internation airport code',
  })
  key: string;

  @ApiProperty({
    example: 'Netherlands',
    description: 'Country name',
  })
  country: string;

  @ApiProperty({
    example: 'Amsterdam',
    description: 'City name',
  })
  city: string;

  @ApiProperty({
    example: 'Amsterdam Airport Schiphol',
    description: 'Airport name',
  })
  name: string;
}
