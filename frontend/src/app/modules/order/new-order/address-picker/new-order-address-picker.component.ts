import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserAddressResponse} from "../../../../models/user.model";

@Component({
    selector: 'app-new-order-address-picker',
    templateUrl: './new-order-address-picker.component.html',
    styles: []
})
export class NewOrderAddressPickerComponent {

    @Input()
    addresses?: UserAddressResponse[];

    @Input()
    disablePicker = false;

    @Input()
    index?: number;

    selectedAddress?: UserAddressResponse;

    @Output()
    addressChanged: EventEmitter<{address: UserAddressResponse, index: number}> = new EventEmitter<{address: UserAddressResponse; index: number}>();

    constructor() {
    }



}
