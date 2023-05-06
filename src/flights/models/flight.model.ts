import { ApiProperty } from '@nestjs/swagger';
import { Airport } from './airport.model';
import { Flights } from './flights.model';
import { Price } from './price.model';
// import { PriceList } from './prices.model';

export class Flight {
  @ApiProperty({ type: () => Airport })
  form: Airport;

  @ApiProperty({ type: () => Airport })
  to: Airport;

  @ApiProperty({
    example: '2024-02-20T16:30:00.000Z',
    description: 'Takeoff date and time',
  })
  takeoffDate: string;

  @ApiProperty({
    example: '2024-02-20T20:15:00.000Z',
    description: 'Landing date and time',
  })
  landingDate: string;

  @ApiProperty({
    example: 225,
    description: 'All flight in minutes',
  })
  timeMins: number;

  @ApiProperty({
    example: 25,
    description: 'Number of avaible seats (tickets)',
  })
  avaible: number;

  @ApiProperty({ type: () => Price })
  price: Price;

  @ApiProperty({ type: () => Flights })
  otherFlights?: Flights;

  @ApiProperty({
    example: 'FP-472',
    description: 'Flight number',
  })
  flightNumber: string;
}
