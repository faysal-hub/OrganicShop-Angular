import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import firebase from 'firebase/app';

import { Order } from '../models/order';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly dbPath = '/orders';

  constructor(
    private db: AngularFireDatabase,
    private cartService: CartService
  ) {}

  async placeOrder(order: Order): Promise<firebase.database.ThenableReference> {
    let result = await this.db.list(this.dbPath).push(order);
    this.cartService.unassignCart();

    return result;
  }

  getAll(): AngularFireList<Order> {
    return this.db.list<Order>(this.dbPath);
  }

  getByUser(userId: string): AngularFireList<Order> {
    return this.db.list<Order>(this.dbPath, (ref) => {
      return ref.orderByChild('userId').equalTo(userId);
    });
  }
  
}
