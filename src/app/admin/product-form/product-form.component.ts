import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { map } from 'rxjs/operators';
import { CategoriesService } from 'src/app/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  categories$: Observable<Category[]>;
  constructor(private categoriesService: CategoriesService) {
    this.categories$ = this.categoriesService
      .getCategories()
      .snapshotChanges()
      .pipe(
        map((categories) =>
          categories.map((c) => ({ key: c.key, ...c.payload.val() }))
        )
      );
  }
}
