import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { SharedModule } from 'src/shared/shared.module';
import { ProductService } from './product.service';
import { NonNegativeValidation } from 'src/shared/validate/products/non-negative-validation';
import { ProductExistValidation } from 'src/shared/validate/products/product-name-validation';

@Module({
  imports: [SharedModule],
  providers: [ProductService, NonNegativeValidation, ProductExistValidation],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
