import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { CartService } from '../cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('showActions') showActions: boolean = true;

  constructor(private cartService: CartService) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
