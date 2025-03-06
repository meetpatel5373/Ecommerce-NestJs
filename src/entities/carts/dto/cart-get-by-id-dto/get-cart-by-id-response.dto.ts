import { CartDTO } from '../cart.dto';
import { Cart } from '../../cart.entity';

export class GetCartByIdResponseDTO extends CartDTO {
  constructor(cart: Cart) {
    super(cart);
  }
}
