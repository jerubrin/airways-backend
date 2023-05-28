import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentItem } from './models/payment-item.entity';
import { Payment } from './models/payment.model';

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
          randomData: JSON.stringify(payment.randomData),
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

    if (!email) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    try {
      const paymentItem = await this.paymentRepository.findBy({ email });
      if (!paymentItem) {
        return [];
      }

      return paymentItem.map((item) => {
        const {
          id,
          email,
          cartPriceData,
          passengersResult,
          flights,
          randomData,
        } = item;
        return {
          id,
          email,
          cartPriceData: JSON.parse(cartPriceData),
          passengersResult: JSON.parse(passengersResult),
          flights: JSON.parse(flights),
          randomData: JSON.parse(randomData),
        } as Payment;
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async removePayment(id: string, req) {
    const email = req?.user?.email;

    if (!email) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    try {
      const paymentItemList = await this.paymentRepository.findBy({ email });
      if (!paymentItemList) {
        throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
      }

      const paymentItem = paymentItemList.find((item) => item.id === id);
      if (!paymentItem) {
        throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
      }

      await this.paymentRepository.delete({ id });

      return {};
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
