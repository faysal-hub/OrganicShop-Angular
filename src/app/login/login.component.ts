import { AuthService } from 'src/app/shared/services/auth.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  loginGoogle(): void {
     let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
     localStorage.setItem('returnUrl', returnUrl);
     
     this.authService.loginGoogle();
  }

  // loginFacebook():void {
  //   this.auth.loginFacebook();
  // }
}
