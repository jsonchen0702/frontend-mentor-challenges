import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { CartItem } from 'src/app/shared/cart-item.model';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-product-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css'],
})
export class ProductDescriptionComponent {
  @Input({ required: true }) product!: Product;

  counter = signal<number>(0);

  constructor(private cartService: CartService) {}

  increment() {
    this.counter.update((oldCounter) => oldCounter + 1);
  }

  decrement() {
    this.counter() > 0 ? this.counter.set(this.counter() - 1) : this.counter();
  }

  addToCart(theProduct: Product) {
    // create const theCartItem from theProduct
    const theCartItem = new CartItem(theProduct);
    // update the quantity
    theCartItem.quantity = this.counter();

    this.cartService.addToCart(theCartItem);
  }
}
