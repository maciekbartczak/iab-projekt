import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { NewOrderComponent } from './new-order/new-order.component';
import {
    NbAccordionModule, NbButtonModule,
    NbCardModule,
    NbLayoutModule,
    NbListModule,
    NbRadioModule,
    NbStepperModule
} from "@nebular/theme";
import { NewOrderAddressPickerComponent } from './new-order/address-picker/new-order-address-picker.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    OrderListComponent,
    NewOrderComponent,
    NewOrderAddressPickerComponent
  ],
    imports: [
        CommonModule,
        OrderRoutingModule,
        NbLayoutModule,
        NbCardModule,
        NbAccordionModule,
        NbListModule,
        NbStepperModule,
        NbRadioModule,
        FormsModule,
        NbButtonModule
    ]
})
export class OrderModule { }
