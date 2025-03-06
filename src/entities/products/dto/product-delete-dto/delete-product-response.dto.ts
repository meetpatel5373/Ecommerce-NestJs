import { ProductDTO } from '../product.dto';
import { Product } from '../../product.entity';

export class DeleteProductResponseDTO extends ProductDTO {
  constructor(product: Product) {
    super(product);
  }
}
