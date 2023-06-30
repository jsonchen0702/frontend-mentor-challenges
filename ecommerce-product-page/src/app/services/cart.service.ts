import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../shared/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(theCartItem: CartItem) {
    // check if we already have the item in our cart
    let alreadyExisitsInCart: boolean = false;
    let existingCartItem: CartItem | undefined;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id
      existingCartItem = this.cartItems.find(
        (tempCartItem) => tempCartItem.productTitle === theCartItem.productTitle
      );
      // check if we found it
      alreadyExisitsInCart = existingCartItem !== undefined;
    }

    if (alreadyExisitsInCart) {
      // update quantity to add the input field
      existingCartItem!.quantity += theCartItem.quantity;
    } else {
      // just add the item to the array cartItems
      this.cartItems.push(theCartItem);
    }

    // compute cart quantity and cart total
    this.computeCartToTals();
  }

  computeCartToTals() {
    let totalQuantityValue: number = 0;

    this.cartItems.map((tempCartItem) => {
      totalQuantityValue += tempCartItem.quantity;
    });

    this.totalQuantity.next(totalQuantityValue);
  }

  removeItem(theCartItem: CartItem) {
    // get index of item in the array
    const itemIndex = this.cartItems.findIndex(
      (tempCartItem) => tempCartItem.productTitle == theCartItem.productTitle
    );

    // if found it, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      // update total quantity
      this.computeCartToTals();
    }
  }
}
