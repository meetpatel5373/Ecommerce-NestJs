import { Cart } from '../../cart.entity';
import { CartDTO } from '../cart.dto';

export class CartCreateResponseDTO extends CartDTO {
  constructor(cart: Cart) {
    super(cart);
  }
}
