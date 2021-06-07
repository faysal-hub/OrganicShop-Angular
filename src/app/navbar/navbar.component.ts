import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user$: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.user$ = this.angularFireAuth.authState;
  }

  logout() {
    this.angularFireAuth.signOut();
  }
  
}
