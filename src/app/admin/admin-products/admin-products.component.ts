import { Product } from './../../models/product';
import { map } from 'rxjs/operators';
import { ProductsService } from './../../products.service';
import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnDestroy {
  private products: Product[];
  private subscription: Subscription;
  filteredProducts: Product[];

  constructor(private productsService: ProductsService) {
    this.subscription = this.productsService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((sps) => sps.map((sp) => ({ key: sp.key, ...sp.payload.val() })))
      )
      .subscribe(
        (products) => (this.filteredProducts = this.products = products)
      );
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter((p) =>
          p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        )
      : this.products;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
