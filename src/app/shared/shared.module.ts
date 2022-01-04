import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { CategoriesService } from './services/category.service';
import { ProductsService } from './services/products.service';
import { UsersService } from './services/user.service';


@NgModule({
  declarations: [ProductCardComponent, ProductQuantityComponent],

  imports: [CommonModule],

  exports: [ProductCardComponent, ProductQuantityComponent],

  providers: [
    AuthService,
    AuthGuard,
    UsersService,
    
    CategoriesService,
    ProductsService,
    CartService,
  ],
})
export class SharedModule {}
