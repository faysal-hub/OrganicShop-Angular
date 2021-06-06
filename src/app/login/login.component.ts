import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private angularFireAuth: AngularFireAuth) {}

  ngOnInit(): void {}

  loginGoogle() {
    this.angularFireAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
}
