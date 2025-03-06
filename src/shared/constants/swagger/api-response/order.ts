import { GetAllOrderResponseDTO } from 'src/entities/orders/dto/order-all-dto/get-order-response.dto';
import { OrderCreateResponseDTO } from 'src/entities/orders/dto/order-create-dto/order-create-response.dto';
import { GetOrderByIdResponseDTO } from 'src/entities/orders/dto/order-get-by-id-dto/get-order-by-id-response.dto';

export const CreateOrderResponse = {
  description: 'Create Order API',
  type: OrderCreateResponseDTO,
};

export const DeleteOrderResponse = {
  description: 'Delete Order API',
  type: GetOrderByIdResponseDTO,
};

export const GetAllOrderResponse = {
  description: 'Get All Orders API',
  type: GetAllOrderResponseDTO,
};
