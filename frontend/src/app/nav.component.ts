/**
 * Created by Sathish on 22/08/17.
 */
import {Component} from '@angular/core';
import {WebService} from './web.service';
import {AuthService} from './auth.service';

@Component({
  selector:'nav',
  providers: [WebService, AuthService],
  template: `
    <md-toolbar color="primary">
      <button md-button routerLink="/">Message Board</button>
      <button md-button routerLink="/messages">Messages</button>
      <span style="flex: 1 1 auto"></span>
      <button *ngIf="!auth.isAuthenticated" md-button routerLink="/login">Login</button>
      <button *ngIf="!auth.isAuthenticated" md-button routerLink="/register">Register</button>
      <button *ngIf="auth.isAuthenticated" md-button routerLink="/user">Welcome {{auth.name}}</button>
      <button *ngIf="auth.isAuthenticated" md-button (click)="auth.logout()">Logout</button>
    </md-toolbar>
  `
})

export class NavComponent {

  constructor(private auth: AuthService) {}

}

