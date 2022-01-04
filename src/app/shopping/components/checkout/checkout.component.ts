import { OnInit, Component } from '@angular/core';

import { Cart } from 'src/app/shared/models/cart';

import { CartService } from 'src/app/shared/services/cart.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  public cart$: Observable<Cart>;

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
}
