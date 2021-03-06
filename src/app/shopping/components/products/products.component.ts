import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Cart } from 'src/app/shared/models/cart';
import { Product } from 'src/app/shared/models/product';
import { CartService } from 'src/app/shared/services/cart.service';

import { ProductsService } from '../../../shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products$: Observable<Product[]>;
  cart$: Observable<Cart>;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
    this.getProducts();
    this.getCart();
  }

  private getProducts(): void {
    this.products$ = this.route.queryParamMap.pipe(
      switchMap((params) => {
        if (!params) return of(null);

        let category = params.get('category');
        return this.applyFilter(category);
      })
    );
  }

  private applyFilter(category: string): Observable<Product[]> {
    if (!category)
      return this.productsService
        .getAll()
        .snapshotChanges()
        .pipe(
          map((sps) => sps.map((sp) => ({ key: sp.key, ...sp.payload.val() })))
        );

      return this.productsService
        .getByCategory(category)
        .snapshotChanges()
        .pipe(
          map((sps) => sps.map((sp) => ({ key: sp.key, ...sp.payload.val() })))
        );
  }

  private async getCart() {
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

