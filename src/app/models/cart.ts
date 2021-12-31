import { CartLine } from './cartLine';
import { Product } from './product';
export class Cart {
  constructor(
    public key: string,
    public cartLines: CartLine[],
    public createdOn: string
  ) {}

  get itemsCount(): number {
    let count = 0;

    for (let productId in this.cartLines) {
      count += this.cartLines[productId].quantity;
    }

    return count;
  }

  getQuantity(product: Product): number {
    if (!this.cartLines) return 0;

    let cartLine: CartLine = this.cartLines[product.key];
    return cartLine ? cartLine.quantity : 0;
  }
}