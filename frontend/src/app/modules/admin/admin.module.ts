import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import {
    NbAccordionModule,
    NbButtonModule,
    NbCardModule,
    NbLayoutModule,
    NbListModule,
    NbSpinnerModule
} from "@nebular/theme";
import { OrderModule } from "../order/order.module";


@NgModule({
  declarations: [
    AdminOrdersComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        NbLayoutModule,
        NbCardModule,
        NbListModule,
        NbAccordionModule,
        NbSpinnerModule,
        OrderModule,
        NbButtonModule
    ]
})
export class AdminModule { }
