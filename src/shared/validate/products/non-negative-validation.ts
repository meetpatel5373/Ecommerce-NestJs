import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ProductService } from 'src/entities/products/product.service';

@ValidatorConstraint({ name: 'customValidator', async: true })
@Injectable()
export class NonNegativeValidation implements ValidatorConstraintInterface {
  constructor(protected readonly productService: ProductService) {}
  async validate(value: string, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    (args.object as object)[relatedPropertyName];

    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
  }

  defaultMessage(args: ValidationArguments) {
    return args.property + ' cannot be a negative value';
  }
}
