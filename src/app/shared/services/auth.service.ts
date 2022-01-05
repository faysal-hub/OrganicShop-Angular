import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AppUser } from '../models/appUser';
import { UsersService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private usersService: UsersService,
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user$ = this.angularFireAuth.authState;
  }

  loginGoogle(): void {
    this.angularFireAuth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  // loginFacebook():void {
  //   this.angularFireAuth.signInWithRedirect(
  //     new firebase.auth.FacebookAuthProvider()
  //   );
  // }

  logout(): void {
    this.angularFireAuth.signOut().then(() => this.router.navigate(['/']));
  }

  get AppUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) return this.usersService.get(user.uid).valueChanges();

        return of(null);
      })
    );
  }
}
