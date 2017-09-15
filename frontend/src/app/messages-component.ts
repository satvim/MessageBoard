import {Component} from '@angular/core';
import {WebService} from './web.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector:'messages',
  providers: [WebService],
  template: `
    <div *ngFor="let message of webService.messages | async">
      <md-card class="card">
        <md-card-title style="cursor: pointer" [routerLink]="['/messages', message.name]">{{message.name}}</md-card-title>
        <md-card-content>{{message.text}}</md-card-content>
      </md-card>
    </div>
  `
})

export class MessagesComponent {

  constructor(private webService : WebService, private route : ActivatedRoute) {}

  ngOnInit () {
    //noinspection TypeScriptUnresolvedVariable
    var name = this.route.snapshot.params.name;
    this.webService.getMessages(name);
    this.webService.getUser().subscribe();
  }

}
