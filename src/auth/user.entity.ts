import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'test@example.com',
    description: 'E-mail',
  })
  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @ApiProperty({
    example: 'Qwerty123@',
    description: 'User password',
  })
  @Column({
    nullable: false,
  })
  password: string;

  @ApiProperty({
    example: 'Vasya',
    description: 'User first name',
  })
  @Column({
    nullable: false,
  })
  firstName: string;

  @ApiProperty({
    example: 'Pupkin',
    description: 'User last name',
  })
  @Column({
    nullable: false,
  })
  lastName: string;

  @ApiProperty({
    example: '1988-02-24T00:00:00',
    description: 'Date of birthday in string format',
  })
  @Column({
    nullable: false,
  })
  dateOfBirth: string;

  @ApiProperty({
    example: 'Male',
    description: 'Gender in string format (Male of Female)',
  })
  @Column({
    nullable: false,
  })
  gender: string;

  @ApiProperty({
    example: '+7',
    description: 'Code of country for phone number',
  })
  @Column({
    nullable: false,
  })
  countryCode: string;

  @ApiProperty({
    example: '555 55 55',
    description: 'Phone number (without country code)',
  })
  @Column({
    nullable: false,
  })
  phone: string;

  @ApiProperty({
    example: 'Kazakhstan',
    description: 'User citizenship',
  })
  @Column({
    nullable: false,
  })
  citizenship: string;
}
