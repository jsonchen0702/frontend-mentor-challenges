import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { Product } from '../../shared/product.model';
import { ProductsService } from '../../services/products.service';
import { LightboxImagesComponent } from '../lightbox-images/lightbox-images.component';

@Component({
  selector: 'app-modal-images',
  standalone: true,
  imports: [CommonModule, LightboxImagesComponent],
  templateUrl: './modal-images.component.html',
  styleUrls: ['./modal-images.component.css'],
})
export class ModalImagesComponent implements OnInit, OnDestroy {
  showModal: boolean = false;
  isFirstImage!: boolean;
  isLastImage!: boolean;
  productLightbox!: Product;
  subscriptionToProductChanged!: Subscription;
  subscriptionToIndexChanged!: Subscription;
  currentImageIndex!: number;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.subscriptionToProductChanged =
      this.productsService.lightboxProductChanged.subscribe((product) => {
        this.productLightbox = product;
        this.showModal = !!this.productLightbox;
        this.currentImageIndex =
          this.productLightbox.imagesThumbnailPath.indexOf(
            this.productLightbox.imageMainPath.replace('.jpg', '-thumbnail.jpg')
          );
        this.isFirstImage = this.currentImageIndex === 0;
        this.isLastImage =
          this.currentImageIndex ===
          this.productLightbox.imagesThumbnailPath.length - 1;
      });
    this.subscriptionToIndexChanged =
      this.productsService.currentThumbnailIndexChanged.subscribe((data) => {
        this.currentImageIndex = data;
      });
  }

  prevImage() {
    this.productsService.prevImage(this.currentImageIndex);
  }

  nextImage() {
    this.productsService.nextImage(this.currentImageIndex);
  }

  close() {
    this.showModal = false;
  }

  ngOnDestroy() {
    this.subscriptionToProductChanged.unsubscribe();
    this.subscriptionToIndexChanged.unsubscribe();
  }
}
