import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductsFilterComponent } from './components/products/products-filter/products-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';



@NgModule({
  declarations: [
    ProductsComponent,
    CartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,

    ProductsFilterComponent,
    ShippingFormComponent,
    CartSummaryComponent,
  ],
  imports: [
    CommonModule, 
    FormsModule,
    SharedModule,
    AppRoutingModule,
  ],
})
export class ShoppingModule {}
