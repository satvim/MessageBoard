/**
 * Created by Sathish on 21/08/17.
 */
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Injectable} from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {Subject} from 'rxjs/Rx';
import {AuthService} from './auth.service';

@Injectable()
export class WebService {

  BASE_URL = 'http://localhost:2000/api';

  private messageStore = [];
  private messagesSubject = new Subject();

  messages = this.messagesSubject.asObservable();

  constructor (private http : Http, private sb : MdSnackBar, private auth: AuthService) {
    //noinspection TypeScriptValidateTypes
    //this.getMessages();
  }

  getMessages (user) {
      user = (user) ? "/" + user : '';
      //noinspection TypeScriptUnresolvedFunction
      this.http.get(this.BASE_URL + '/messages' + user).subscribe(response => {
        this.messageStore = response.json();
        this.messagesSubject.next(this.messageStore);
      }, error => {
        this.handleError("Unable to get messages");
      });
  }

  getUser() {
    return this.http.get(this.BASE_URL + '/users/me', this.auth.tokenHeader).map(res => res.json());
  }

  saveUser(userData) {
    return this.http.post(this.BASE_URL + '/users/me', userData, this.auth.tokenHeader).map(res => res.json());
  }

  async postMessage (message) {
    try {
      //noinspection TypeScriptUnresolvedFunction
      var response = await this.http.post(this.BASE_URL + '/messages', message).toPromise();
      this.messageStore.push(response.json());
      this.messagesSubject.next(this.messageStore);
    } catch (error) {
      this.handleError("Unable to post message");
    }

  }

  private handleError(error) {
    console.error(error);
    //noinspection TypeScriptValidateTypes
    this.sb.open(error,'close',{duration:2000});
  }
}
