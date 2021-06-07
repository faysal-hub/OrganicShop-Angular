import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly dbPath = '/users';

  constructor(private db: AngularFireDatabase) {}

  save(key: string, value: any): Promise<void> {
    return this.db.object(`${this.dbPath}/${key}`).update(value);
  }
}
