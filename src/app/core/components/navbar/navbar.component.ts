import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppUser } from 'src/app/shared/models/appUser';
import { Cart } from 'src/app/shared/models/cart';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

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
