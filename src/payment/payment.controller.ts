import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { Payment } from './models/payment.model';
import { PaymentService } from './payment.service';

@Controller('payments')
@ApiTags('Payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Add Payment' })
  @ApiResponse({ status: 201, type: String })
  @UseGuards(JwtAuthGuard)
  @Post('pay')
  pay(@Body() paymentList: Payment[], @Request() req) {
    return this.paymentService.setNewPayment(paymentList, req);
  }

  @ApiOperation({ summary: 'Get all payments' })
  @ApiResponse({ status: 201, type: [Payment] })
  @UseGuards(JwtAuthGuard)
  @Get('list')
  async getList(@Request() req): Promise<Payment[]> {
    return await this.paymentService.getPayments(req);
  }

  @ApiOperation({ summary: 'Add Payment (without authorization by email)' })
  @ApiResponse({ status: 201, type: String })
  @ApiQuery({
    name: 'email',
    description: 'Enter email',
    example: 'xsmilex@inbox.ru',
  })
  @Post('oauth-pay')
  payOauth(@Body() paymentList: Payment[], @Query() params: { email: string }) {
    const { email } = params;
    return this.paymentService.setNewPayment(paymentList, { user: { email } });
  }

  @ApiOperation({ summary: 'Get all payments (without authorization by email)' })
  @ApiResponse({ status: 201, type: [Payment] })
  @ApiQuery({
    name: 'email',
    description: 'Enter email',
    example: 'xsmilex@inbox.ru',
  })
  @Post('oauth-list')
  async getListOauth(@Query() { email }): Promise<Payment[]> {
    return await this.paymentService.getPayments({ user: { email } });
  }

  @ApiOperation({ summary: 'Remove payment' })
  @ApiResponse({ status: 200, type: Object })
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'id',
    description: 'Enter payment uuid',
    example: 'xxxxxxx-xxxxxxx-xxxx',
  })
  @Delete('delete')
  async removePayment(@Query() { id }, @Request() req): Promise<any> {
    return await this.paymentService.removePayment(id, req);
  }

  @ApiOperation({ summary: 'Remove payment (without authorization by email)' })
  @ApiResponse({ status: 201, type: [Payment] })
  @ApiQuery({
    name: 'email',
    description: 'Enter email',
    example: 'xsmilex@inbox.ru',
  })
  @ApiQuery({
    name: 'id',
    description: 'Enter payment uuid',
    example: 'xxxxxxx-xxxxxxx-xxxx',
  })
  @Delete('oauth-delete')
  async removePaymentOauth(@Query() { id, email }): Promise<any> {
    return await this.paymentService.removePayment(id, { user: { email } });
  }
}
