import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import {
    NbAlertModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbLayoutModule,
    NbSpinnerModule
} from "@nebular/theme";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    RegisterComponent,
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
        FormsModule,
        NbSpinnerModule,
        ReactiveFormsModule,
        NbAlertModule
    ]
})
export class AuthModule { }
