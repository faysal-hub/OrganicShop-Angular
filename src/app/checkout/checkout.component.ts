import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Shipping } from './../models/shipping';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  shipping: Shipping = {} as Shipping;

  constructor() {}

  ngOnInit(): void {}

  placeOrder(): void {
    console.log(this.shipping);
  }
  
}
