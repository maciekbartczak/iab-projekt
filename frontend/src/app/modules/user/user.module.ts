import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import {
    NbAccordionModule, NbAlertModule,
    NbButtonModule,
    NbCardModule, NbDialogModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule, NbSpinnerModule
} from "@nebular/theme";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BasicInfoComponent } from './profile/basic-info/basic-info.component';
import { AddressesComponent } from './profile/addresses/addresses.component';
import { AddAddressDialogComponent } from './profile/addresses/add-address-dialog/add-address-dialog.component';


@NgModule({
  declarations: [
    ProfileComponent,
    BasicInfoComponent,
    AddressesComponent,
    AddAddressDialogComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        NbLayoutModule,
        NbCardModule,
        NbInputModule,
        FormsModule,
        NbAccordionModule,
        NbButtonModule,
        NbIconModule,
        NbDialogModule.forChild(),
        ReactiveFormsModule,
        NbAlertModule,
        NbSpinnerModule
    ]
})
export class UserModule { }
