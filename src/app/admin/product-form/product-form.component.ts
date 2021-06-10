import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Category } from 'src/app/models/category';

import { CategoriesService } from 'src/app/category.service';
import { ProductsService } from './../../products.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  categories$: Observable<Category[]>;
  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private router: Router
  ) {
    this.categories$ = this.categoriesService
      .getCategories()
      .snapshotChanges()
      .pipe(
        map((categories) =>
          categories.map((c) => ({ key: c.key, ...c.payload.val() }))
        )
      );
  }

  save(f: NgForm) {
    this.productsService
      .create(f.value)
      .then((ref) => this.router.navigate(['/admin/products']));
  }
}
