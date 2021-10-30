import { Component } from '@angular/core';
import { loginRequest } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent{

  public loginRequest: loginRequest = {
    username: '',
    password: ''
  }

  constructor() { }


  login() {
    if (this.loginRequest.username && this.loginRequest.password) {

    }
  }

}
