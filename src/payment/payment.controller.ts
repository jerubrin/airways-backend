import {
  Body,
  Controller,
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

  @ApiOperation({ summary: 'Search Flights' })
  @ApiResponse({ status: 201, type: String })
  @UseGuards(JwtAuthGuard)
  @Post('pay')
  pay(@Body() paymentList: Payment[], @Request() req) {
    return this.paymentService.setNewPayment(paymentList, req);
  }

  @ApiOperation({ summary: 'Search Airport' })
  @ApiResponse({ status: 201, type: [Payment] })
  @UseGuards(JwtAuthGuard)
  @Get('list')
  async getList(@Request() req): Promise<Payment[]> {
    return await this.paymentService.getPayments(req);
  }

  @ApiOperation({ summary: 'Search Flights (without authorization)' })
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

  @ApiOperation({ summary: 'Search Airport' })
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
}
