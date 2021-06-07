import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private route: ActivatedRoute
  ) {
    this.user$ = this.angularFireAuth.authState;
  }

  loginGoogle(): void {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

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
    this.angularFireAuth.signOut();
  }
}
