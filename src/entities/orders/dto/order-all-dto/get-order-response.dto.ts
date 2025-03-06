import { Order } from '../../order.entity';

export class GetAllOrderResponseDTO {
  orders: Order[];

  constructor(orders: Order[]) {
    this.orders = orders;
  }
}
