/**
 * Created by Sathish on 28/08/17.
 */
/**
 * Created by Sathish on 22/08/17.
 */
import {Component} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector:'login',
  providers: [AuthService],
  template: `
    <md-card>
      <md-input-container>
        <input mdInput [(ngModel)]="loginData.email" placeholder="Email" type="email">
      </md-input-container>
      <md-input-container>
        <input mdInput [(ngModel)]="loginData.password" placeholder="Password" type="password">
      </md-input-container>
      <button md-raised-button color="primary" (click)="login()">Login</button>
    </md-card>
  `
})

export class LoginComponent {

  constructor (private auth: AuthService) {}

  loginData = {
    email: '',
    password: ''
  }

  login () {
    this.auth.login(this.loginData);
  }

}


