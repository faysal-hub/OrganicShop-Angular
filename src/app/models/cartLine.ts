export class CartLine {
  key: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;

  constructor(init?: Partial<CartLine>) {
    Object.assign(this, init);
  }

  get totalPrice(): number {
    return this.quantity * this.price;
  }
}
