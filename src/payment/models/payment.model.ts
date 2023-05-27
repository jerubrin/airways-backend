import { ApiProperty } from '@nestjs/swagger';
import { Flight } from 'src/flights/models/flight.model';
import { PassengersResultData } from './passengers-result-data.model';
import { PriceData } from './price-data.model';

export class Payment {
  @ApiProperty({
    example: 'aaaaaaaaaa-aaaaa',
    description: "Payment's id",
  })
  id: string;

  @ApiProperty({
    type: () => PriceData,
    description: 'Total price and passengers count',
  })
  cartPriceData: PriceData;

  @ApiProperty({
    type: () => PassengersResultData,
    description: 'All passengers by type',
  })
  passengersResult: PassengersResultData;

  @ApiProperty({
    type: () => Flight,
    description: 'Selected flights',
  })
  flights: Flight[];
}
