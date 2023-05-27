import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  search(@Body() paymentList: Payment[], @Request() req) {
    return this.paymentService.setNewPayment(paymentList, req);
  }

  @ApiOperation({ summary: 'Search Airport' })
  @ApiResponse({ status: 201, type: [Payment] })
  @UseGuards(JwtAuthGuard)
  @Get('list')
  async searchCity(@Request() req): Promise<Payment[]> {
    return await this.paymentService.getPayments(req);
  }
}
