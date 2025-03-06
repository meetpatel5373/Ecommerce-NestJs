import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart } from './cart.entity';
import { CartCreateRequestDTO } from './dto/cart-create-dto/cart-create-request.dto';
import { CartCreateResponseDTO } from './dto/cart-create-dto/cart-create-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedisService } from 'src/shared/redis/redis.service';
import { GetCartByUserIdResponseDTO } from './dto/cart-get-by-id-dto/get-cart-by-user-id-response.dto';
import { Product } from '../products/product.entity';
import { GetCartByIdResponseDTO } from './dto/cart-get-by-id-dto/get-cart-by-id-response.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    private redisService: RedisService,
  ) {}

  /**
   * * Create Function
   * @param product_id:number,
   * @param quantity:number,
   * ? This API is used for create purpose
   */
  createOrUpdate = async (
    reqData: CartCreateRequestDTO,
    user_id: string,
  ): Promise<CartCreateResponseDTO> => {
    const product = await this.productRepository.findOne({
      where: { id: +reqData.product_id },
    });

    if (!product) throw new Error('Product not found');

    const cartExist = await this.cartRepository.findOne({
      where: { user_id: +user_id, product_id: +reqData.product_id },
    });

    const createOrUpdate = {
      user_id: +user_id,
      product_id: +reqData.product_id,
      quantity: +reqData.quantity,
    };

    if (cartExist) {
      await this.cartRepository.update({ id: cartExist.id }, createOrUpdate);
    } else {
      await this.cartRepository.save(createOrUpdate);
    }

    const cart = await this.cartRepository.findOne({
      where: { user_id: +user_id, product_id: +reqData.product_id },
    });

    await this.productRepository.update(
      { id: +reqData.product_id },
      { quantity: product.quantity - Number(reqData.quantity) },
    );

    const response = await this.cartRepository.findOne({
      where: { id: cart.id },
    });

    return new CartCreateResponseDTO(response);
  };

  /**
   * * Get Cart By User Function
   * ? This API is used for create purpose
   */
  getCartByUser = async (
    user_id: string,
  ): Promise<GetCartByUserIdResponseDTO> => {
    const response = await this.cartRepository.find({
      where: { user_id: +user_id },
      relations: ['product'],
    });

    if (!response) {
      throw new NotFoundException('cart is empty');
    }

    let result = [];
    for (let index = 0; index < response.length; index++) {
      const element = response[index];

      const resObj = {
        id: element.id,
        user_id: element.user_id,
        product_id: element.product_id,
        name: element.product.name,
        product_price: element.product.price,
        quantity: element.quantity,
        total_amount: element.product.price * element.quantity,
        image: element.product.image,
      };

      result.push(resObj);
    }

    return new GetCartByUserIdResponseDTO(result);
  };

  /**
   * * Remove Items Function
   * ? This API is used for Remove purpose
   */
  deleteCartItem = async (
    product_id: string,
    user_id: string,
  ): Promise<GetCartByIdResponseDTO> => {
    const response = await this.cartRepository.findOneBy({
      product_id: +product_id,
      user_id: +user_id,
    });

    if (!response) {
      throw new NotFoundException('item not found');
    }

    await this.cartRepository.delete({
      id: +response.id,
    });

    const product = await this.productRepository.findOne({
      where: { id: +product_id },
    });

    await this.productRepository.update(
      { id: +product_id },
      { quantity: product.quantity + Number(response.quantity) },
    );

    return new GetCartByIdResponseDTO(response);
  };
}
