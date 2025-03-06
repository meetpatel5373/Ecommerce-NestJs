import { ApiProperty } from '@nestjs/swagger';
import {
  propsFirstCreatedAt,
  propsLastModifiedAt,
  propsPrimaryKey,
} from 'src/shared/constants/swagger/api-property/default';

import { Order } from '../order.entity';
import { propsUserId } from 'src/shared/constants/swagger/api-property/user';

export class OrderDTO {
  @ApiProperty(propsPrimaryKey)
  readonly id: number;

  @ApiProperty(propsUserId)
  readonly userId: number;

  @ApiProperty()
  readonly status: string;

  @ApiProperty(propsFirstCreatedAt)
  readonly createdAt: Date;

  @ApiProperty(propsLastModifiedAt)
  readonly updatedAt: Date;

  constructor(order: Order) {
    this.id = order.id;
    this.userId = order.user_id;
    this.status = order.status;
    this.createdAt = order.created_at;
    this.updatedAt = order.updated_at;
  }
}
