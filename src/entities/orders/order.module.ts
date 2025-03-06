import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { SharedModule } from 'src/shared/shared.module';
import { OrderService } from './order.service';

@Module({
  imports: [SharedModule],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
