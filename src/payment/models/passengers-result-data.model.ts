import { ApiProperty } from '@nestjs/swagger';
import { PassengersData } from './passenger-data.model';

export class PassengersResultData {
  @ApiProperty({
    type: () => Array<PassengersData>,
    description: 'Adults passengers',
  })
  adults: PassengersData[];

  @ApiProperty({
    type: () => Array<PassengersData>,
    description: 'Children passengers',
  })
  children: PassengersData[];

  @ApiProperty({
    type: () => Array<PassengersData>,
    description: 'Infants passengers',
  })
  infants: PassengersData[];
}
