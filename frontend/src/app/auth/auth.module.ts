import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { NbButtonModule, NbCardModule, NbInputModule, NbLayoutModule } from "@nebular/theme";


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NbLayoutModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule
  ]
})
export class AuthModule { }
