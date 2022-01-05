import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { NgxSpinnerService } from 'ngx-spinner';

import { AuthService } from './shared/services/auth.service';
import { UsersService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private bnIdle: BnNgIdleService,
    private spinner: NgxSpinnerService,
    private usersService: UsersService,
    private auth: AuthService,
    private router: Router,
  ) {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
    this.auth.user$.subscribe((user) => {
      let returnUrl = localStorage.getItem('returnUrl');

      if (!user || !returnUrl) return;

      this.usersService.save(user.uid, {
        email: user.email,
        name: user.displayName,
      });

      this.router.navigateByUrl(returnUrl);
      localStorage.removeItem('returnUrl');
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
