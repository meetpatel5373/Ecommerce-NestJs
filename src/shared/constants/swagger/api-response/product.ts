import { ProductCreateResponseDTO } from 'src/entities/products/dto/product-create-dto/product-create-response.dto';
import { GetProductByIdResponseDTO } from 'src/entities/products/dto/product-get-by-id-dto/get-product-by-id-response.dto';
import { UpdateProductResponseDTO } from 'src/entities/products/dto/product-update-dto/update-product-response.dto';
import { GetAllProductResponseDTO } from 'src/entities/products/dto/products-all-dto/get-product-response.dto';

export const CreateProductResponse = {
  description: 'Create Product API',
  type: ProductCreateResponseDTO,
};

export const UpdateProductResponse = {
  description: 'Update Product API',
  type: UpdateProductResponseDTO,
};

export const DeleteProductResponse = {
  description: 'Delete Product API',
  type: GetProductByIdResponseDTO,
};

export const GetAllProductResponse = {
  description: 'Get All Products API',
  type: GetAllProductResponseDTO,
};
