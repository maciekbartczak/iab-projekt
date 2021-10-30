import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './auth.component';
import { NbButtonModule, NbCardModule, NbInputModule, NbLayoutModule } from "@nebular/theme";
import { FormsModule } from "@angular/forms";


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
    NbButtonModule,
    FormsModule
  ]
})
export class AuthModule { }
