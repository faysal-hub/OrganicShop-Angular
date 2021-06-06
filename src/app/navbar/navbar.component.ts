import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user: firebase.User;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.angularFireAuth.authState.subscribe((user) => (this.user = user));
  }

  logout() {
    this.angularFireAuth.signOut();
  }
  
}
