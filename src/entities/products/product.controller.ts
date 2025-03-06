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
import { ProductService } from './product.service';
import {
  ApiConsumes,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AllExceptionsFilter } from 'src/shared/exception/HttpExceptionFilter';
import {
  CreateProductResponse,
  DeleteProductResponse,
  GetAllProductResponse,
  UpdateProductResponse,
} from 'src/shared/constants/swagger/api-response/product';
import { ProductCreateRequestDTO } from './dto/product-create-dto/product-create-request.dto';
import { ProductCreateResponseDTO } from './dto/product-create-dto/product-create-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from 'src/shared/validate/files/file-required-validation';
import { GetAllProductResponseDTO } from './dto/products-all-dto/get-product-response.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt.auth';
import { AbilitiesGuard } from 'src/shared/ability/ability.guard';
import { CheckAbility } from 'src/shared/ability/ability.decorator';
import { Action } from 'src/shared/enum/roles';
import { Product } from './product.entity';
import { GetProductByIdResponseDTO } from './dto/product-get-by-id-dto/get-product-by-id-response.dto';
import { UpdateProductResponseDTO } from './dto/product-update-dto/update-product-response.dto';
import { UpdateProductRequestDTO } from './dto/product-update-dto/update-product-request.dto';

@ApiTags('Product')
@UseFilters(AllExceptionsFilter)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * --------------------------------------------------------------------------------
   * * Create Product API
   * @param name:string,
   * @param quantity:string,
   * @param price:string,
   * @param image:string,
   * ? This API is used for Register purpose
   */
  @Post()
  @ApiOkResponse(CreateProductResponse)
  @ApiOperation({ summary: 'Create Product API' })
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @ApiConsumes('multipart/form-data')
  @CheckAbility({ action: Action.Create, subject: Product })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @HttpCode(201)
  public async create(
    @Body() reqData: ProductCreateRequestDTO,
    @UploadedFile(FileValidationPipe) image: Express.Multer.File,
  ): Promise<ProductCreateResponseDTO> {
    return this.productService.create(reqData, image);
  }

  /**
   * --------------------------------------------------------------------------------
   * * Get All Product API
   * ? This API is used for retrieve all the products
   */
  @Get()
  @ApiOkResponse(GetAllProductResponse)
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Get All Product API' })
  @HttpCode(200)
  public async getAll(): Promise<GetAllProductResponseDTO> {
    return this.productService.getAll();
  }

  /**
   * --------------------------------------------------------------------------------
   * * Get All Product API
   * ? This API is used for retrieve all the products
   */
  @Get(':product_id')
  @ApiOkResponse(GetAllProductResponse)
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Get Product By Id API' })
  @HttpCode(200)
  public async getById(
    @Param('product_id') product_id: string,
  ): Promise<GetProductByIdResponseDTO> {
    return this.productService.getById(product_id);
  }

  /**
   * --------------------------------------------------------------------------------
   * * Update Product API
   * @param name:string,
   * @param quantity:string,
   * @param price:string,
   * @param image:string,
   * ? This API is used for Update purpose
   */
  @Put(':product_id')
  @ApiOkResponse(UpdateProductResponse)
  @ApiOperation({ summary: 'Update Product API' })
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @ApiConsumes('multipart/form-data')
  @CheckAbility({ action: Action.Update, subject: Product })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @HttpCode(200)
  public async update(
    @Param('product_id') product_id: string,
    @Body() reqData: UpdateProductRequestDTO,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<UpdateProductResponseDTO> {
    return this.productService.update(product_id, reqData, image);
  }

  /**
   * --------------------------------------------------------------------------------
   * * Delete Product API
   * ? This API is used for Delete purpose
   */
  @Delete(':product_id')
  @ApiOkResponse(DeleteProductResponse)
  @ApiOperation({ summary: 'Delete Product API' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbility({ action: Action.Delete, subject: Product })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @HttpCode(200)
  public async delete(
    @Param('product_id') product_id: string,
  ): Promise<UpdateProductResponseDTO> {
    return this.productService.delete(product_id);
  }
}
