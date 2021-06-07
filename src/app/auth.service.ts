import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(public angularFireAuth: AngularFireAuth) {
    this.user$ = this.angularFireAuth.authState;
  }

  loginGoogle() {
    this.angularFireAuth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  // loginFacebook() {
  //   this.angularFireAuth.signInWithRedirect(
  //     new firebase.auth.FacebookAuthProvider()
  //   );
  // }

  logout() {
    this.angularFireAuth.signOut();
  }

}
