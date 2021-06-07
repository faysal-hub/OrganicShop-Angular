import { Observable } from 'rxjs';
import { AppUser } from './../models/appUser';
import { AuthService } from './../auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  appUser$: Observable<AppUser>;

  constructor(private authService: AuthService) {
    this.appUser$ = authService.AppUser$;
  }

  logout() {
    this.authService.logout();
  }
}
