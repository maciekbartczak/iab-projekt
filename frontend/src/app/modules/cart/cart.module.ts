import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule, NbListModule } from "@nebular/theme";


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
        NbIconModule
    ]
})
export class CartModule { }
