import { Order } from '../../order.entity';
import { OrderDTO } from '../order.dto';

export class OrderCreateResponseDTO extends OrderDTO {
  constructor(order: Order) {
    super(order);
  }
}
