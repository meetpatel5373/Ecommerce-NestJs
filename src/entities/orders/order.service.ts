import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './order.entity';
import { OrderCreateResponseDTO } from './dto/order-create-dto/order-create-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetOrderByIdResponseDTO } from './dto/order-get-by-id-dto/get-order-by-id-response.dto';
import { GetAllOrderResponseDTO } from './dto/order-all-dto/get-order-response.dto';
import { Cart } from '../carts/cart.entity';
import { OrderItems } from '../order-items/order-item.entity';
import { OrderStatus } from 'src/shared/enum/order-status';
import { Product } from '../products/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItems)
    private orderItemsRepository: Repository<OrderItems>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  /**
   * * Create Function
   * ? This API is used for create purpose
   */
  create = async (user_id: string): Promise<OrderCreateResponseDTO> => {
    const cartData = await this.cartRepository.find({
      where: { user_id: +user_id },
      relations: ['product'],
    });

    if (cartData.length == 0) {
      throw new NotFoundException('cart is empty');
    }

    const createdOrder = await this.orderRepository.save({ user_id: +user_id });

    for (let index = 0; index < cartData.length; index++) {
      const element = cartData[index];

      const saveObj = {
        order_id: +createdOrder.id,
        product_id: +element.product_id,
        quantity: +element.quantity,
        total_amount: +element.product.price * element.quantity,
      };

      await this.orderItemsRepository.save(saveObj);
    }

    this.cartRepository.delete({ user_id: +user_id });

    const response = await this.orderRepository.findOneBy({
      id: createdOrder.id,
    });

    return new OrderCreateResponseDTO(response);
  };

  /**
   * * Get All Function
   * ? This API is used for getAll purpose
   */
  getAll = async (): Promise<GetAllOrderResponseDTO> => {
    const response = await this.orderRepository.find();

    return new GetAllOrderResponseDTO(response);
  };

  /**
   * * Get By Id Function
   * ? This API is used for Get By Id purpose
   */
  getById = async (order_id: string): Promise<GetOrderByIdResponseDTO> => {
    const response = await this.orderRepository.findOneBy({
      id: +order_id,
    });

    if (!response) {
      throw new NotFoundException('order not found');
    }

    return new GetOrderByIdResponseDTO(response);
  };

  /**
   * * cancel order Function
   * ? This API is used for cancel purpose
   */
  cancel = async (order_id: string): Promise<GetOrderByIdResponseDTO> => {
    const response = await this.orderRepository.findOneBy({
      id: +order_id,
    });

    if (!response) {
      throw new NotFoundException('order not found');
    }

    await this.orderRepository.update(
      {
        id: +order_id,
      },
      {
        status: OrderStatus.cancelled,
      },
    );

    let orderItems = await this.orderItemsRepository.find({
      where: { order_id: +order_id },
    });

    for (let index = 0; index < orderItems.length; index++) {
      const element = orderItems[index];

      const productData = await this.productRepository.findOneBy({
        id: element.product_id,
      });

      if (productData) {
        this.productRepository.update(
          { id: productData.id },
          {
            quantity: productData.quantity + element.quantity,
          },
        );
      }
    }

    return new GetOrderByIdResponseDTO(response);
  };
}
