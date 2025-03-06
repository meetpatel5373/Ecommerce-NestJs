import { ProductDTO } from '../product.dto';
import { Product } from '../../product.entity';

export class UpdateProductResponseDTO extends ProductDTO {
  constructor(product: Product) {
    super(product);
  }
}
