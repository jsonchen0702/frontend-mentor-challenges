import { HostListener, Injectable } from '@angular/core';

import { Product } from '../shared/product.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products: Product[] = [
    new Product(
      'Sneaker Company',
      'Fall Limited Edition Sneakers',
      ' These low-profile sneakers are your perfect casual wear companion.Featuring a durable rubber outer sole, they’ll withstand everything theweather can offer.',
      250,
      125,
      50,
      '../../assets/images/image-product-1.jpg',
      [
        '../../assets/images/image-product-1-thumbnail.jpg',
        '../../assets/images/image-product-2-thumbnail.jpg',
        '../../assets/images/image-product-3-thumbnail.jpg',
        '../../assets/images/image-product-4-thumbnail.jpg',
      ]
    ),
  ];

  private productModalLightbox!: Product;
  lightboxProductChanged = new Subject<Product>();
  productsChanged = new Subject<Product[]>();
  currentThumbnailIndexChanged = new Subject<number>();

  private lengthThumnailImages: number = this.productModalLightbox
    ? this.productModalLightbox.imagesThumbnailPath.length - 1
    : this.products[0].imagesThumbnailPath.length - 1;

  constructor() {}

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.shouldShowNavButtons();
  }

  shouldShowNavButtons(): boolean {
    const screenWidth = window.innerWidth;
    return screenWidth <= 480;
  }

  getProducts(): Product[] {
    return this.products.slice();
  }

  setProductToOpenModalLightbox(theProduct: Product) {
    this.productModalLightbox = Object.assign({}, theProduct);
    this.lightboxProductChanged.next(this.productModalLightbox);
  }

  prevImage(index: number) {
    if (index > 0) {
      index--;
      this.switchImage(index);
    }
  }

  nextImage(index: number) {
    if (index < this.lengthThumnailImages) {
      index++;
      this.switchImage(index);
    }
  }

  private updateState(currentImageIndex: number) {
    const prevBtn = document.getElementById('prevBtn') as HTMLButtonElement;
    const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;

    prevBtn.disabled = currentImageIndex === 0;
    nextBtn.disabled = currentImageIndex === this.lengthThumnailImages;
  }

  private switchImage(index: number) {
    if (this.shouldShowNavButtons()) {
      this.products[0].imageMainPath = this.products[0].imagesThumbnailPath[
        index
      ].replace('-thumbnail.jpg', '.jpg');
      this.productsChanged.next(this.products);
    } else {
      this.productModalLightbox.imageMainPath =
        this.productModalLightbox.imagesThumbnailPath[index].replace(
          '-thumbnail.jpg',
          '.jpg'
        );
      this.lightboxProductChanged.next(this.productModalLightbox);
    }
    this.updateState(index);
  }
}
