import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { NbAccordionModule, NbCardModule, NbInputModule, NbLayoutModule } from "@nebular/theme";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProfileComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        NbLayoutModule,
        NbCardModule,
        NbInputModule,
        FormsModule,
        NbAccordionModule
    ]
})
export class UserModule { }
