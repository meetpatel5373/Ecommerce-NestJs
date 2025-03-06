import { ApiProperty } from '@nestjs/swagger';
import {
  propsFirstCreatedAt,
  propsLastModifiedAt,
  propsPrimaryKey,
} from 'src/shared/constants/swagger/api-property/default';
import { Cart } from '../cart.entity';
import { propsUserId } from 'src/shared/constants/swagger/api-property/user';
import {
  propsProductId,
  propsProductQuantity,
} from 'src/shared/constants/swagger/api-property/product';

export class CartDTO {
  @ApiProperty(propsPrimaryKey)
  readonly id: number;

  @ApiProperty(propsUserId)
  readonly userId: number;

  @ApiProperty(propsProductId)
  readonly productId: number;

  @ApiProperty(propsProductQuantity)
  readonly quantity: number;

  @ApiProperty(propsFirstCreatedAt)
  readonly createdAt: Date;

  @ApiProperty(propsLastModifiedAt)
  readonly updatedAt: Date;

  constructor(cart: Cart) {
    this.id = cart.id;
    this.userId = cart.user_id;
    this.productId = cart.product_id;
    this.quantity = cart.quantity;
    this.createdAt = cart.created_at;
    this.updatedAt = cart.updated_at;
  }
}
