import { OrderService } from 'src/app/shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent {
  orders$: Observable<Order[]>;

  constructor(private orderService: OrderService) {
    this.orders$ = this.orderService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((sos) => sos.map((so) => ({ key: so.key, ...so.payload.val() })))
      );
  }
}
