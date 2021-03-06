import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart } from 'src/app/shared/models/cart';
import { Product } from 'src/app/shared/models/product';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart$: Observable<Cart>;

  constructor(private cartService: CartService) {}

  async ngOnInit(): Promise<void> {
    this.cart$ = (await this.cartService.getCart())
      .snapshotChanges()
      .pipe(
        map(
          (sc) =>
            new Cart(
              sc.key,
              sc.payload.val().cartLines,
              sc.payload.val().createdOn
            )
        )
      );
  }

  clearCart() {
    this.cartService.clearCart();
  }

  removeItem(item: Product) {
    this.cartService.removeItem(item);
  }
}
