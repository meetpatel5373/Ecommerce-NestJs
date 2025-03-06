import { Cart } from '../../cart.entity';

export class GetCartByUserIdResponseDTO {
  carts: Cart[];

  constructor(cart: Cart[]) {
    this.carts = cart;
  }
}
