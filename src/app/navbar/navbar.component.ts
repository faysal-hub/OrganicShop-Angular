import { AuthService } from './../auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user$: any;

  constructor(private authService: AuthService) {
    this.user$ = authService.user$;
  }

  logout() {
    this.authService.logout();
  }
}
