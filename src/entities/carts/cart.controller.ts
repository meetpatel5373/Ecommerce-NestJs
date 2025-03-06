import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CartService } from './cart.service';
import {
  ApiConsumes,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AllExceptionsFilter } from 'src/shared/exception/HttpExceptionFilter';

import { CartCreateRequestDTO } from './dto/cart-create-dto/cart-create-request.dto';
import { CartCreateResponseDTO } from './dto/cart-create-dto/cart-create-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from 'src/shared/validate/files/file-required-validation';
import { JwtAuthGuard } from 'src/shared/guards/jwt.auth';
import { AbilitiesGuard } from 'src/shared/ability/ability.guard';
import { CheckAbility } from 'src/shared/ability/ability.decorator';
import { Action } from 'src/shared/enum/roles';
import { Cart } from './cart.entity';
import { GetCartByUserIdResponseDTO } from './dto/cart-get-by-id-dto/get-cart-by-user-id-response.dto';

import {
  CreateCartResponse,
  DeleteCartResponse,
  GetCartByIdResponse,
} from 'src/shared/constants/swagger/api-response/cart';
import { GetCartByIdResponseDTO } from './dto/cart-get-by-id-dto/get-cart-by-id-response.dto';

@ApiTags('Cart')
@UseFilters(AllExceptionsFilter)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /**
   * --------------------------------------------------------------------------------
   * * Add to Cart API /Remove from Cart API
   * @param product_id:string,
   * @param quantity:string,
   * ? This API is used for Create purpose
   */
  @Post()
  @ApiOkResponse(CreateCartResponse)
  @ApiOperation({ summary: 'Add to Cart API /Remove from Cart API' })
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @HttpCode(200)
  public async create(
    @Body() bodyParams: CartCreateRequestDTO,
    @Request() req: Request,
  ): Promise<CartCreateResponseDTO> {
    return this.cartService.createOrUpdate(bodyParams, req['user'].userId);
  }

  /**
   * --------------------------------------------------------------------------------
   * * Get Cart Items API
   * ? This API is used for retrieve all the carts
   */
  @Get()
  @ApiOkResponse(GetCartByIdResponse)
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Get Cart items By User API' })
  @HttpCode(200)
  public async getCartByUser(
    @Request() req: Request,
  ): Promise<GetCartByUserIdResponseDTO> {
    return this.cartService.getCartByUser(req['user'].userId);
  }

  /**
   * --------------------------------------------------------------------------------
   * * Get Cart Items API
   * ? This API is used for retrieve all the carts
   */
  @Delete(':product_id')
  @ApiOkResponse(DeleteCartResponse)
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Delete Cart item API' })
  @HttpCode(200)
  public async deleteCartItem(
    @Request() req: Request,
    @Param('product_id') product_id: string,
  ): Promise<GetCartByIdResponseDTO> {
    return this.cartService.deleteCartItem(product_id, req['user'].userId);
  }
}
