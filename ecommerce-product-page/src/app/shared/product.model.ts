export class Product {
  constructor(
    public companyTitle: string,
    public productTitle: string,
    public description: string,
    public oldPrice: number,
    public newPrice: number,
    public percentDecrease: number,
    public imageMainPath: string,
    public imagesThumbnailPath: string[],
    public quantity?: number
  ) {}
}
