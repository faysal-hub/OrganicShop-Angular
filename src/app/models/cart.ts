import { CartLine } from './cartLine';
export class Cart {
    constructor(
        public key: string,
        public cartLines: CartLine[],
        public createdOn: string) {
        }

    get itemsCount() : number {
      let count = 0;

      for (let productId in this.cartLines) {
        count += this.cartLines[productId].quantity;
      }

      return count;
    }
}