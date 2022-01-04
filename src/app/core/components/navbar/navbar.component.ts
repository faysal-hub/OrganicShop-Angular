import { Observable } from 'rxjs';
import { AppUser } from 'src/app/shared/models/appUser';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

import { Cart } from 'src/app/shared/models/cart';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  appUser$: Observable<AppUser>;
  cart$: Observable<Cart>;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  async ngOnInit(): Promise<void> {
    this.appUser$ = this.authService.AppUser$;

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

  logout() {
    this.authService.logout();
  }
}
