import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map, take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from './../../models/product';

import { Category } from 'src/app/models/category';

import { CategoriesService } from 'src/app/category.service';
import { ProductsService } from './../../products.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  product: any = {};
  categories$: Observable<Category[]>;
  id: string;

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.init();
  }

  init() {
    this.getProductOnEdit();
    this.getCategories();
  }

  getProductOnEdit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!this.id) return;

    this.productsService
      .get(this.id)
      .snapshotChanges()
      .pipe(take(1))
      .pipe(map((sp) => ({ key: sp.key, ...sp.payload.val() })))
      .subscribe((p) => (this.product = p));
  }

  getCategories() {
    this.categories$ = this.categoriesService.getCategories()
    .snapshotChanges()
    .pipe(map(scs => scs.map(sc => ({ key: sc.key, ...sc.payload.val() }))));
   }



  save(f: NgForm) {
     if (this.id)
      this.productsService.update(this.product.key, f.value);
    else
      this.productsService.create(f.value);

    this.router.navigate(['/admin/products']);
   }
}
