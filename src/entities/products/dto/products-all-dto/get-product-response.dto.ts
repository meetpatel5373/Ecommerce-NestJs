import { Product } from '../../product.entity';

export class GetAllProductResponseDTO {
  products: Product[];

  constructor(products: Product[]) {
    this.products = products;
  }
}
