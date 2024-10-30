import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderOptionsService } from './order-options/order-options.service';

@Module({
  providers: [OrderService, OrderOptionsService],
  controllers: [OrderController]
})
export class OrderModule {}
