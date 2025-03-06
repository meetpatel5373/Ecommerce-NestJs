import { ProductDTO } from '../product.dto';
import { Product } from '../../product.entity';

export class GetProductByIdResponseDTO extends ProductDTO {
  constructor(product: Product) {
    super(product);
  }
}
