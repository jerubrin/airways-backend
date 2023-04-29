import { ApiProperty } from '@nestjs/swagger';

export class RegistrationRequest {
  @ApiProperty({
    example: 'test@example.com',
    description: 'E-mail',
  })
  readonly email: string;

  @ApiProperty({
    example: 'Qwerty123@',
    description: 'User password',
  })
  readonly password: string;

  @ApiProperty({
    example: 'Vasya',
    description: "User's first name",
  })
  readonly firstName: string;

  @ApiProperty({
    example: 'Pupkin',
    description: "User's last name",
  })
  readonly lastName: string;

  @ApiProperty({
    example: '1988-02-24T00:00:00',
    description: 'Date of birthday in string format',
  })
  readonly dateOfBirth: string;

  @ApiProperty({
    example: 'Male',
    description: 'Gender in string format (Male of Female)',
  })
  readonly gender: string;

  @ApiProperty({
    example: '+7',
    description: 'Code of country for phone number',
  })
  readonly countryCode: string;

  @ApiProperty({
    example: '555 55 55',
    description: 'Phone number (without country code)',
  })
  readonly phone: string;

  @ApiProperty({
    example: 'Kazakhstan',
    description: 'User citizenship',
  })
  readonly citizenship: string;
}
