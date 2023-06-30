import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { __values } from 'tslib';
import { Subscription } from 'rxjs';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../shared/product.model';
import { CartComponent } from '../cart/cart.component';
import { LightboxImagesComponent } from '../lightbox-images/lightbox-images.component';
import { ModalImagesComponent } from '../modal-images/modal-images.component';
import { ProductDescriptionComponent } from '../product-description/product-description.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CartComponent,
    LightboxImagesComponent,
    ModalImagesComponent,
    ProductDescriptionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  productList!: Product[];
  subscription!: Subscription;
  currentImageIndex!: number;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productList = this.productsService.getProducts();
    this.currentImageIndex = this.productList[0].imagesThumbnailPath.indexOf(
      this.productList[0].imageMainPath.replace('.jpg', '-thumbnail.jpg')
    );
    this.subscription = this.productsService.productsChanged.subscribe(
      (products) => {
        this.productList = products;
        this.currentImageIndex = products[0].imagesThumbnailPath.indexOf(
          products[0].imageMainPath.replace('.jpg', '-thumbnail.jpg')
        );
      }
    );
  }

  prevImage() {
    console.log('pre', this.currentImageIndex);
    this.productsService.prevImage(this.currentImageIndex);
  }
  nextImage() {
    console.log('next', this.currentImageIndex);

    this.productsService.nextImage(this.currentImageIndex);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
