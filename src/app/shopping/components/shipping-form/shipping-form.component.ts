import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import firebase from 'firebase';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/shared/models/cart';
import { Order } from 'src/app/shared/models/order';
import { Shipping } from 'src/app/shared/models/shipping';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: Cart;
  public shipping: Shipping = {} as Shipping;
  private user: firebase.User;
  private userSubscription: Subscription;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userSubscription = this.authService.user$.subscribe(
      (u) => (this.user = u)
    );
  }

  async placeOrder(): Promise<void> {
    let order = new Order(this.cart, this.shipping, this.user.uid);
    let result = await this.orderService.placeOrder(order);

    window.location.href = `/order-success/${result.key}`;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}