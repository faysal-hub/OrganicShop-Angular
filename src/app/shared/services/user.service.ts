import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

import { AppUser } from '../models/appUser';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly dbPath = '/users';

  constructor(private db: AngularFireDatabase) {}

  save(key: string, value: any): Promise<void> {
    return this.db.object(`${this.dbPath}/${key}`).update(value);
  }

  get(key: string): AngularFireObject<AppUser> {
    return this.db.object<AppUser>(`${this.dbPath}/${key}`);
  }
}
