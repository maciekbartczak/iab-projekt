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
    NbRadioModule, NbSpinnerModule,
    NbStepperModule
} from "@nebular/theme";
import { NewOrderAddressPickerComponent } from './new-order/address-picker/new-order-address-picker.component';
import {FormsModule} from "@angular/forms";
import { PrettyOrderStatusPipe } from './pipes/pretty-order-status.pipe';


@NgModule({
  declarations: [
    OrderListComponent,
    NewOrderComponent,
    NewOrderAddressPickerComponent,
    PrettyOrderStatusPipe
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
        NbButtonModule,
        NbSpinnerModule
    ]
})
export class OrderModule { }
