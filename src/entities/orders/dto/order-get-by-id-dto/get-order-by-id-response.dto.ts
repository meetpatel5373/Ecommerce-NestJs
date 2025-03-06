import { OrderDTO } from '../order.dto';
import { Order } from '../../order.entity';

export class GetOrderByIdResponseDTO extends OrderDTO {
  constructor(order: Order) {
    super(order);
  }
}
