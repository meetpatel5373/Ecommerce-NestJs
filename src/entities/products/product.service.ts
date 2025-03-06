import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductCreateRequestDTO } from './dto/product-create-dto/product-create-request.dto';
import { ProductCreateResponseDTO } from './dto/product-create-dto/product-create-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AwsService } from 'src/shared/aws-upload/aws.service';
import { config } from 'src/config';
import { RedisService } from 'src/shared/redis/redis.service';
import { GetAllProductResponseDTO } from './dto/products-all-dto/get-product-response.dto';
import { GetProductByIdResponseDTO } from './dto/product-get-by-id-dto/get-product-by-id-response.dto';
import { UpdateProductRequestDTO } from './dto/product-update-dto/update-product-request.dto';
import { UpdateProductResponseDTO } from './dto/product-update-dto/update-product-response.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    private awsService: AwsService,
    private redisService: RedisService,
  ) {}

  /**
   * * Create Function
   * @param name:string,
   * @param quantity:string,
   * @param price:string,
   * @param image:string,
   * ? This API is used for create purpose
   */
  create = async (
    reqData: ProductCreateRequestDTO,
    image: Express.Multer.File,
  ): Promise<ProductCreateResponseDTO> => {
    const create = {
      name: reqData.name,
      price: +reqData.price,
      quantity: +reqData.quantity,
    };

    const createdRecord = await this.productRepository.save(create);

    const fileName = await this.awsService.uploadFile(
      image,
      config().APP_ENV + '/product_' + createdRecord.id + '/',
    );

    await this.productRepository.update(
      { id: createdRecord.id },
      {
        image: fileName,
      },
    );

    const response = await this.productRepository.findOneBy({
      id: createdRecord.id,
    });

    const cachedData = await this.redisService.getKey('products');
    if (!cachedData) {
      this.redisService.setKey('products', [response]);
    } else {
      cachedData.push(response);
      this.redisService.setKey('products', cachedData);
    }

    return new ProductCreateResponseDTO(response);
  };

  /**
   * * Update Function
   * @param name:string,
   * @param quantity:string,
   * @param price:string,
   * @param image:string,
   * ? This API is used for Update purpose
   */
  update = async (
    product_id: string,
    reqData: UpdateProductRequestDTO,
    image: Express.Multer.File,
  ): Promise<UpdateProductResponseDTO> => {
    const response = await this.productRepository.findOneBy({
      id: +product_id,
    });

    if (!response) {
      throw new NotFoundException('product not found');
    }

    const updateRecord = {
      name: reqData.name,
      price: +reqData.price,
      quantity: +reqData.quantity,
    };

    if (image) {
      const fileName = await this.awsService.uploadFile(
        image,
        config().APP_ENV + '/product_' + product_id + '/',
      );

      this.awsService.awsDeleteFile(response.image);

      updateRecord['image'] = fileName;
    }

    await this.productRepository.update({ id: +product_id }, updateRecord);

    const result = await this.productRepository.findOneBy({
      id: +product_id,
    });

    const cachedData = await this.redisService.getKey('products');
    if (!cachedData) {
      this.redisService.setKey('products', [result]);
    } else {
      cachedData.push(result);
      this.redisService.setKey('products', cachedData);
    }

    return new UpdateProductResponseDTO(result);
  };

  /**
   * * Get All Function
   * ? This API is used for getAll purpose
   */
  getAll = async (): Promise<GetAllProductResponseDTO> => {
    const cachedData = await this.redisService.getKey('products');

    if (cachedData) {
      return new GetAllProductResponseDTO(cachedData);
    }

    const response = await this.productRepository.find();

    return new GetAllProductResponseDTO(response);
  };

  /**
   * * Get By Id Function
   * ? This API is used for Get By Id purpose
   */
  getById = async (product_id: string): Promise<GetProductByIdResponseDTO> => {
    const response = await this.productRepository.findOneBy({
      id: +product_id,
    });

    if (!response) {
      throw new NotFoundException('product not found');
    }

    return new GetProductByIdResponseDTO(response);
  };

  /**
   * * Retrieving product by name Function
   * @param name:string,
   * ? This API is used for Retrieving product by name purpose
   */
  getProductByName = async (name: string): Promise<Product> => {
    const productData = await this.productRepository.findOneBy({ name: name });

    if (productData == null) {
      return null;
    }

    return productData;
  };

  /**
   * * Delete Function
   * ? This API is used for Delete purpose
   */
  delete = async (product_id: string): Promise<GetProductByIdResponseDTO> => {
    const response = await this.productRepository.findOneBy({
      id: +product_id,
    });

    if (!response) {
      throw new NotFoundException('product not found');
    }

    await this.productRepository.delete({
      id: +product_id,
    });

    this.awsService.awsDeleteFile(response.image);

    const result = await this.productRepository.find();
    this.redisService.setKey('products', result);

    return new GetProductByIdResponseDTO(response);
  };

  getAvailableQuantityById = async (product_id: string) => {
    const response = await this.productRepository.findOneBy({
      id: +product_id,
    });

    return response ? response.quantity : 0;
  };
}
