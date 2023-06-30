import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product } from '../../shared/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-lightbox-images',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lightbox-images.component.html',
  styleUrls: ['./lightbox-images.component.css'],
})
export class LightboxImagesComponent {
  @Input({ required: true }) product!: Product;
  @Input({ required: false }) mainImageWidth!: number;
  selectedThumbnailIndex!: number;

  constructor(private productsService: ProductsService) {}

  ngDoCheck() {
    const mainImagePath = this.product.imageMainPath;
    const thumbnailImages = this.product.imagesThumbnailPath;

    thumbnailImages.forEach((thumbnailImagePath, index) => {
      const thumbnailImage = thumbnailImagePath.replace(
        '-thumbnail.jpg',
        '.jpg'
      );

      if (thumbnailImage === mainImagePath) {
        this.selectedThumbnailIndex = index;
      }
    });
  }

  selectMainImage(imageThumbnailPath: string, index: number) {
    this.product.imageMainPath = imageThumbnailPath
      .slice(0, -14)
      .concat('.jpg');
    this.productsService.currentThumbnailIndexChanged.next(index);
  }

  openModalLightbox(product: Product) {
    this.productsService.setProductToOpenModalLightbox(product);
  }
}
