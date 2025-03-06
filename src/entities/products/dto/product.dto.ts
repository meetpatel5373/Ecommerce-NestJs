import { ApiProperty } from '@nestjs/swagger';
import {
  propsFirstCreatedAt,
  propsLastModifiedAt,
  propsPrimaryKey,
} from 'src/shared/constants/swagger/api-property/default';

import { Product } from '../product.entity';
import {
  propsProductName,
  propsProductPrice,
  propsProductQuantity,
} from 'src/shared/constants/swagger/api-property/product';

export class ProductDTO {
  @ApiProperty(propsPrimaryKey)
  readonly id: number;

  @ApiProperty(propsProductName)
  readonly name: string;

  @ApiProperty(propsProductQuantity)
  readonly quantity: number;

  @ApiProperty(propsProductPrice)
  readonly price: number;

  @ApiProperty()
  readonly image: string;

  @ApiProperty(propsFirstCreatedAt)
  readonly createdAt: Date;

  @ApiProperty(propsLastModifiedAt)
  readonly updatedAt: Date;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.quantity = product.quantity;
    this.price = product.price;
    this.image = product.image;
    this.createdAt = product.created_at;
    this.updatedAt = product.updated_at;
  }
}
