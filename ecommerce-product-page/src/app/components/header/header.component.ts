import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartService } from '../../services/cart.service';
import { CartComponent } from '../cart/cart.component';
import { Subscription } from 'rxjs';
@Component({
  standalone: true,
  imports: [CommonModule, CartComponent],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isCartOpen: boolean = false;
  totalQuantity: number = 0;
  subscription!: Subscription;

  constructor(private cartService: CartService, private elRef: ElementRef) {}

  ngOnInit() {
    this.totalQuantitiesDetails();
  }

  totalQuantitiesDetails() {
    // subscribe to the cart total quantity
    this.subscription = this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );

    // compute cart total price and total quantity
    this.cartService.computeCartToTals();
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: HTMLElement) {
    const iconCartElement =
      this.elRef.nativeElement.querySelector('.icon-cart');
    const clickedOnIcon =
      iconCartElement && iconCartElement.contains(targetElement);
    const cartElement = this.elRef.nativeElement.querySelector('.cart');
    const clickedInsideCart =
      cartElement && cartElement.contains(targetElement);
    if (!clickedInsideCart && !clickedOnIcon) {
      this.isCartOpen = false;
    }
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
