import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ProductService } from 'src/entities/products/product.service';

@ValidatorConstraint({ name: 'customValidator', async: true })
@Injectable()
export class QuantityValidation implements ValidatorConstraintInterface {
  constructor(protected readonly productService: ProductService) {}
  async validate(value: string, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const quantity = (args.object as object)[relatedPropertyName];
    const available = await this.productService.getAvailableQuantityById(value);
    return available >= quantity && available > 0;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Out of Stock';
  }
}
