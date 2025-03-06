import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { SharedModule } from 'src/shared/shared.module';
import { CartService } from './cart.service';
import { NonNegativeValidation } from 'src/shared/validate/products/non-negative-validation';
import { ProductService } from '../products/product.service';
import { QuantityValidation } from 'src/shared/validate/carts/quantity-check-validation';

@Module({
  imports: [SharedModule],
  providers: [
    CartService,
    NonNegativeValidation,
    QuantityValidation,
    ProductService,
  ],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
