import { Component, OnInit } from '@angular/core';
import { loginRequest } from "../../../models/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  public loginRequest: loginRequest = {
    username: '',
    password: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.loginRequest.username, this.loginRequest.password)
  }

}
