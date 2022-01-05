import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { TableModule } from 'ngx-easy-table';

import { AppRoutingModule } from '../app-routing.module';
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

  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    TableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    AppRoutingModule,
  ],

  exports: [
    CommonModule,
    ProductCardComponent,
    ProductQuantityComponent,
    FormsModule,
    CustomFormsModule,
    TableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    AppRoutingModule,
  ],

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
