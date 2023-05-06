import { ApiProperty } from '@nestjs/swagger';
import { Flight } from './flight.model';

export class Flights {
  @ApiProperty({ type: () => Flight })
  '-5': Flight;

  @ApiProperty({ type: () => Flight })
  '-4': Flight;

  @ApiProperty({ type: () => Flight })
  '-3': Flight;

  @ApiProperty({ type: () => Flight })
  '-2': Flight;

  @ApiProperty({ type: () => Flight })
  '-1': Flight;

  @ApiProperty({ type: () => Flight })
  '1': Flight;

  @ApiProperty({ type: () => Flight })
  '2': Flight;

  @ApiProperty({ type: () => Flight })
  '3': Flight;

  @ApiProperty({ type: () => Flight })
  '4': Flight;

  @ApiProperty({ type: () => Flight })
  '5': Flight;
}
