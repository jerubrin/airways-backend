import { ApiProperty } from '@nestjs/swagger';
import { Price } from './price.model';

export class PriceList {
  @ApiProperty({
    type: () => Price,
    description: '2 days before the selected date price',
  })
  '-2'?: Price | null;

  @ApiProperty({
    type: () => Price,
    description: '1 day before the selected date price',
  })
  '-1'?: Price | null;

  @ApiProperty({
    type: () => Price,
    description: 'current day price',
  })
  '0': Price;

  @ApiProperty({
    type: () => Price,
    description: '1 day after the selected date price',
  })
  '1'?: Price | null;

  @ApiProperty({
    type: () => Price,
    description: '2 days after the selected date price',
  })
  '2'?: Price | null;
}
