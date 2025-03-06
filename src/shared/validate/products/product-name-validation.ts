import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ProductService } from 'src/entities/products/product.service';

@ValidatorConstraint({ name: 'customValidator', async: true })
@Injectable()
export class ProductExistValidation implements ValidatorConstraintInterface {
  constructor(protected readonly productService: ProductService) {}
  async validate(value: string, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    (args.object as object)[relatedPropertyName];

    if (value == undefined || value == '') {
      return false;
    }

    return (await this.productService.getUserByName(value)) == null;
  }

  defaultMessage(args: ValidationArguments) {
    if (args.value == undefined || args.value == '') {
      return 'name is required';
    }
    return 'product with same name exists';
  }
}
