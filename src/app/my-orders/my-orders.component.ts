import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/shared/services/order.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent {
  orders$: Observable<Order[]>;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {
    this.orders$ = this.authService.user$.pipe(
      switchMap((u) =>
        this.orderService
          .getByUser(u.uid)
          .snapshotChanges()
          .pipe(
            map((sos) =>
              sos.map((so) => ({ key: so.key, ...so.payload.val() }))
            )
          )
      )
    );
  }
}
