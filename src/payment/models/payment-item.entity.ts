import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentItem {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ nullable: false })
  id: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  cartPriceData: string;

  @Column({ nullable: false })
  passengersResult: string;

  @Column({ nullable: false })
  flights: string;

  @Column({ nullable: true })
  randomData?: string;
}
