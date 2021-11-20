import { Component, Input } from '@angular/core';
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

    constructor(private dialogService: NbDialogService) {
    }

    openAddAddressDialog() {
        this.dialogService.open(AddAddressDialogComponent, {
            context: {
                userId: this.userId,
            },
        });
    }
}
