import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import firebase from 'firebase/app';
import { map, take } from 'rxjs/operators';

import { Cart } from '../models/cart';
import { CartLine } from '../models/cartLine';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly dbPath = '/carts';

  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<AngularFireObject<Cart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object<Cart>(`${this.dbPath}/${cartId}`);
  }

  async addToCart(product: Product): Promise<void> {
    return this.updateQuantity(product, 1);
  }

  async removeFromCart(product: Product): Promise<void> {
    return this.updateQuantity(product, -1);
  }

  async removeItem(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let cartLines$ = this.getCartLine(cartId, product.key);

    return this.removeCartItem(cartLines$);
  }

  async clearCart(): Promise<void> {
    let cartId = await this.getOrCreateCartId();
    let cartLines$ = this.getCartLines(cartId);

    return this.removeCartLines(cartLines$);
  }

  unassignCart(): void {
    localStorage.removeItem('cartId');
  }

  private async updateQuantity(
    product: Product,
    change: number
  ): Promise<void> {
    let cartId = await this.getOrCreateCartId();
    let cartLine$ = this.getCartLine(cartId, product.key);

    cartLine$
      .snapshotChanges()
      .pipe(take(1))
      .pipe(map((scl) => ({ key: scl.key, ...scl.payload.val() })))
      .subscribe((cl) => {
        let quantity = (cl.quantity || 0) + change;
        if (quantity === 0) return this.removeCartLine(cartLine$);

        return this.updateCartLine(cartLine$, {
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: quantity,
        });
      });
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;

    let cart = this.create();
    localStorage.setItem('cartId', cart.key);

    return cart.key;
  }

  private create(): firebase.database.ThenableReference {
    return this.db.list(this.dbPath).push({
      createdOn: new Date().toLocaleString(),
    });
  }

  private getCartLine(
    cartId: string,
    productId: string
  ): AngularFireObject<CartLine> {
    return this.db.object<CartLine>(
      `${this.dbPath}/${cartId}/cartLines/${productId}`
    );
  }

  private updateCartLine(
    cartLine$: AngularFireObject<CartLine>,
    cartLine: any
  ): Promise<void> {
    return cartLine$.update(cartLine);
  }

  private removeCartLine(
    cartLine$: AngularFireObject<CartLine>
  ): Promise<void> {
    return cartLine$.remove();
  }

  private getCartLines(cartId: string): AngularFireObject<CartLine> {
    return this.db.object<CartLine>(`${this.dbPath}/${cartId}/cartLines`);
  }

  private removeCartLines(
    cartLines$: AngularFireObject<CartLine>
  ): Promise<void> {
    return cartLines$.remove();
  }

  private removeCartItem(
    cartLines$: AngularFireObject<CartLine>
  ): Promise<void> {
    return cartLines$.remove();
  }
}


