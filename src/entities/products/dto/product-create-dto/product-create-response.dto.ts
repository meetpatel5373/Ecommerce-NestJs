import { Product } from '../../product.entity';
import { ProductDTO } from '../product.dto';

export class ProductCreateResponseDTO extends ProductDTO {
  constructor(product: Product) {
    super(product);
  }
}
