import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import { CartService } from '../cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('cart') cart: Cart;
  @Input('showActions') showActions: boolean = true;

  constructor(private cartService: CartService) {}

  addToCart(): void {
    this.cartService.addToCart(this.product);
  }

  getQuantity(): number {
    return this.cart?.cartLines[this.product.key]?.quantity || 0;
  }
}
