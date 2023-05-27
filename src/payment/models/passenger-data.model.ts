import { ApiProperty } from '@nestjs/swagger';

export class PassengersData {
  @ApiProperty({
    example: 1,
    description: "Passenger's index",
  })
  id: number;

  @ApiProperty({
    example: 'Alexey',
    description: "Passenger's first name",
  })
  firstName: string;

  @ApiProperty({
    example: 'Kuptsov',
    description: "Passenger's last name",
  })
  lastName: string;

  @ApiProperty({
    example: 'Male',
    description: "Passenger's gender",
  })
  gender?: string;

  @ApiProperty({
    example: '24/02/1988',
    description: "Passenger's date of birthday",
  })
  dateOfBirth: string;

  @ApiProperty({
    example: false,
    description: 'Need help?',
  })
  specialAssistance?: boolean;

  @ApiProperty({
    example: true,
    description: 'Baggage is included',
  })
  checkedInBaggage?: boolean;
}
