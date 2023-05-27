import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { PaymentItem } from './models/payment-item.entity';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentItem]),
    JwtModule.register({
      secret: process.env.JWT_PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, JwtAuthGuard],
  exports: [PaymentService, TypeOrmModule, JwtModule],
})
export class PaymentModule {}
