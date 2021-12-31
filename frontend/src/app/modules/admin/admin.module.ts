import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { NbCardModule, NbLayoutModule, NbListModule } from "@nebular/theme";


@NgModule({
  declarations: [
    AdminOrdersComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        NbLayoutModule,
        NbCardModule,
        NbListModule
    ]
})
export class AdminModule { }
