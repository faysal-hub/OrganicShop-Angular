import { UsersService } from './user.service';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private bnIdle: BnNgIdleService,
    private usersService: UsersService,
    private auth: AuthService,
    private router: Router
  ) {
    this.auth.user$.subscribe((user) => {
      let returnUrl = localStorage.getItem('returnUrl');

      if (user && returnUrl) {
        this.usersService.save(user.uid, {
          email: user.email,
          name: user.displayName,
        });

        this.router.navigateByUrl(returnUrl);
        localStorage.removeItem('returnUrl');
      }
    });
  }

  ngOnInit(): void {
    this.bnIdle.startWatching(3000).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
          this.auth.logout();
      }
    });
  }
}
