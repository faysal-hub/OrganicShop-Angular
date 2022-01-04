import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { TableModule } from 'ngx-easy-table';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from './../app-routing.module';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';


@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TableModule,
    CustomFormsModule,
    AppRoutingModule,
  ],

  providers: [AdminAuthGuard],
})
export class AdminModule {}
