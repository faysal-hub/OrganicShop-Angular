import { AuthService } from './../auth.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Shipping } from '../models/shipping';
import { Observable, Subscription } from 'rxjs';
import { Cart } from '../models/cart';
import { OrderService } from '../order.service';
import { Order } from '../models/order';
import firebase from 'firebase';

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