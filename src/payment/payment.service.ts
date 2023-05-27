import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentItem } from './models/payment-item.entity';
import { Payment } from './models/payment.model';

export const DAY_IN_MS = 1000 * 60 * 60 * 24;

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentItem)
    private paymentRepository: Repository<PaymentItem>,
  ) {}

  async setNewPayment(paymentList: Payment[], req) {
    const email = req?.user?.email;

    if (!email) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    try {
      const paymentDbData = paymentList.map((payment) => {
        const paymentItem: Partial<PaymentItem> = {
          id: payment.id,
          email,
          cartPriceData: JSON.stringify(payment.cartPriceData),
          passengersResult: JSON.stringify(payment.passengersResult),
          flights: JSON.stringify(payment.flights),
        };
        return paymentItem;
      });
      await this.paymentRepository.save(paymentDbData);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    return 'Success!';
  }

  async getPayments(req): Promise<Payment[]> {
    const email = req?.user?.email;
    console.log(email);

    if (!email) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    try {
      const paymentItem = await this.paymentRepository.findBy({ email });
      if (!paymentItem) {
        return [];
      }

      return paymentItem.map((item) => {
        const { id, email, cartPriceData, passengersResult, flights } = item;
        return {
          id,
          email,
          cartPriceData: JSON.parse(cartPriceData),
          passengersResult: JSON.parse(passengersResult),
          flights: JSON.parse(flights),
        } as Payment;
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
