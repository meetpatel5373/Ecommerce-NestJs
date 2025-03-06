import { CartCreateResponseDTO } from 'src/entities/carts/dto/cart-create-dto/cart-create-response.dto';
import { GetCartByIdResponseDTO } from 'src/entities/carts/dto/cart-get-by-id-dto/get-cart-by-id-response.dto';
import { GetCartByUserIdResponseDTO } from 'src/entities/carts/dto/cart-get-by-id-dto/get-cart-by-user-id-response.dto';

export const CreateCartResponse = {
  description: 'Create Cart API',
  type: CartCreateResponseDTO,
};

export const DeleteCartResponse = {
  description: 'Delete Cart Items API',
  type: GetCartByIdResponseDTO,
};

export const GetCartByIdResponse = {
  description: 'Get Cart Items by User API',
  type: GetCartByUserIdResponseDTO,
};
