import { Product } from './product.model';

export class CartItem {
  productTitle: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;

  constructor(product: Product) {
    this.productTitle = product.productTitle;
    this.unitPrice = product.newPrice;
    this.imageUrl = product.imageMainPath;
    this.quantity = 0;
  }
}
