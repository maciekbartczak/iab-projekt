import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { ItemsListComponent } from './items-list/items-list.component';
import {
    NbButtonModule,
    NbCardModule,
    NbIconModule, NbInputModule,
    NbLayoutModule,
    NbListModule,
    NbSpinnerModule
} from "@nebular/theme";
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    CartComponent,
    ItemsListComponent
  ],
    imports: [
        CommonModule,
        CartRoutingModule,
        NbLayoutModule,
        NbCardModule,
        NbListModule,
        NbButtonModule,
        NbIconModule,
        NbSpinnerModule,
        NbInputModule,
        FormsModule
    ]
})
export class CartModule { }
