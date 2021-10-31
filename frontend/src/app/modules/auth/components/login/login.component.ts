import { Component } from '@angular/core';
import { loginDetails } from '../../models/auth.model';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent{

  public loginData: loginDetails = {
    username: '',
    password: ''
  }

  constructor(private authService: AuthService) { }


  login() {
    if (this.loginData.username && this.loginData.password) {
      this.authService.login(this.loginData)
          .subscribe(
              (res) => {
                  console.log(`${res}`);
              },
              (err) => {
                  console.log(err);
              }
          )
    }
  }

}
