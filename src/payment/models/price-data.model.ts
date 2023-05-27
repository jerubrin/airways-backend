import { ApiProperty } from '@nestjs/swagger';
import { Price } from 'src/flights/models/price.model';

export class PriceData {
  @ApiProperty({
    type: () => Price,
    description: 'Total price',
  })
  totalPrice: Price;

  @ApiProperty({
    example: 1,
    description: 'Count of adult passengers',
  })
  adults: number;

  @ApiProperty({
    example: 1,
    description: 'Count of child passengers',
  })
  children: number;

  @ApiProperty({
    example: 1,
    description: 'Count of infant passengers',
  })
  infants: number;
}
