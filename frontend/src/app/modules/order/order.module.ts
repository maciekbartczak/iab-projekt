import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { NbAccordionModule, NbCardModule, NbLayoutModule, NbListModule } from "@nebular/theme";


@NgModule({
  declarations: [
    OrderListComponent,
    NewOrderComponent
  ],
    imports: [
        CommonModule,
        OrderRoutingModule,
        NbLayoutModule,
        NbCardModule,
        NbAccordionModule,
        NbListModule
    ]
})
export class OrderModule { }
