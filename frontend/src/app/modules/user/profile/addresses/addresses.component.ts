import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CreateUserAddressRequest } from "../../../../models/user.model";
import { NbDialogService } from "@nebular/theme";
import { AddAddressDialogComponent } from "./add-address-dialog/add-address-dialog.component";

@Component({
    selector: 'app-addresses',
    templateUrl: './addresses.component.html',
    styles: []
})
export class AddressesComponent {

    @Input()
    userAddresses?: CreateUserAddressRequest[];

    @Input()
    userId: string = '';

    @Output()
    refreshProfileEvent = new EventEmitter<void>();

    constructor(private dialogService: NbDialogService) {
    }

    openAddAddressDialog() {
        this.dialogService.open(AddAddressDialogComponent, {
            context: {
                userId: this.userId,
            },
        }).onClose.subscribe(() => this.refreshProfileEvent.emit());
    }
}
