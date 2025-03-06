import { ProductCreateResponseDTO } from 'src/entities/products/dto/product-create-dto/product-create-response.dto';
import { DeleteProductResponseDTO } from 'src/entities/products/dto/product-delete-dto/delete-product-response.dto';
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
  type: DeleteProductResponseDTO,
};

export const GetAllProductResponse = {
  description: 'Get All Products API',
  type: GetAllProductResponseDTO,
};
