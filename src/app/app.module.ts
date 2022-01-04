import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BnNgIdleService } from 'bn-ng-idle';
import { CustomFormsModule } from 'ng2-validation';
import { TableModule } from 'ngx-easy-table';

import { environment } from './../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsFilterComponent } from './products/products-filter/products-filter.component';
import { ProductsComponent } from './products/products.component';
import { SharedModule } from './shared/shared.module';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';


@NgModule({

  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    CartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    
    LoginComponent,
    ProductsFilterComponent,
    ShippingFormComponent,
    CartSummaryComponent,
  ],

  imports: [
    BrowserModule,
    AdminModule,
    SharedModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule,
    FormsModule,
    CustomFormsModule,
    TableModule,
  ],

  providers: [
    AdminAuthGuard, 
    BnNgIdleService
  ],

  bootstrap: [AppComponent],
})

export class AppModule {}
