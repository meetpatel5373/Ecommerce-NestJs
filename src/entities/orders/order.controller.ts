import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AllExceptionsFilter } from 'src/shared/exception/HttpExceptionFilter';
import { OrderCreateResponseDTO } from './dto/order-create-dto/order-create-response.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt.auth';
import { AbilitiesGuard } from 'src/shared/ability/ability.guard';
import { CheckAbility } from 'src/shared/ability/ability.decorator';
import { Action } from 'src/shared/enum/roles';
import { Order } from './order.entity';
import { GetOrderByIdResponseDTO } from './dto/order-get-by-id-dto/get-order-by-id-response.dto';
import {
  CreateOrderResponse,
  DeleteOrderResponse,
  GetAllOrderResponse,
} from 'src/shared/constants/swagger/api-response/order';
import { GetAllOrderResponseDTO } from './dto/order-all-dto/get-order-response.dto';
import { OrderItems } from '../order-items/order-item.entity';

@ApiTags('Order')
@UseFilters(AllExceptionsFilter)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * --------------------------------------------------------------------------------
   * * Create Order API
   * ? This API is used for Create purpose
   */
  @Post()
  @ApiOkResponse(CreateOrderResponse)
  @ApiOperation({ summary: 'Create Order API' })
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @HttpCode(201)
  public async create(
    @Request() req: Request,
  ): Promise<OrderCreateResponseDTO> {
    return this.orderService.create(req['user'].userId);
  }

  /**
   * --------------------------------------------------------------------------------
   * * Get All Order API
   * ? This API is used for retrieve all the orders
   */
  @Get()
  @ApiOkResponse(GetAllOrderResponse)
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbility(
    { action: Action.ReadAll, subject: Order },
    { action: Action.ReadAll, subject: OrderItems },
  )
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Get All Order API' })
  @HttpCode(200)
  public async getAll(): Promise<GetAllOrderResponseDTO> {
    return this.orderService.getAll();
  }

  /**
   * --------------------------------------------------------------------------------
   * * Get Order by Id API
   * ? This API is used for retrieve all the orders
   */
  @Get(':order_id')
  @ApiOkResponse(GetAllOrderResponse)
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Get Order By Id API' })
  @HttpCode(200)
  public async getById(
    @Param('order_id') order_id: string,
  ): Promise<GetOrderByIdResponseDTO> {
    return this.orderService.getById(order_id);
  }

  /**
   * --------------------------------------------------------------------------------
   * * Cancel Order API
   * ? This API is used for Cancel purpose
   */
  @Put(':order_id')
  @ApiOkResponse(DeleteOrderResponse)
  @ApiOperation({ summary: 'Cancel Order API' })
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @HttpCode(200)
  public async cancel(
    @Param('order_id') order_id: string,
  ): Promise<GetOrderByIdResponseDTO> {
    return this.orderService.cancel(order_id);
  }
}
