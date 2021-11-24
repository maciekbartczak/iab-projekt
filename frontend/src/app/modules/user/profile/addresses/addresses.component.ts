import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CreateUserAddressRequest, UserAddressResponse} from "../../../../models/user.model";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import { AddAddressDialogComponent } from "./add-address-dialog/add-address-dialog.component";
import {UserService} from "../../../../services/user.service";

@Component({
    selector: 'app-addresses',
    templateUrl: './addresses.component.html',
    styles: []
})
export class AddressesComponent {

    @Input()
    userAddresses?: UserAddressResponse[];

    @Input()
    userId: string = '';

    @Output()
    refreshProfileEvent = new EventEmitter<void>();

    constructor(private dialogService: NbDialogService,
                private userService: UserService,
                private toastService: NbToastrService) {
    }

    openAddAddressDialog() {
        this.dialogService.open(AddAddressDialogComponent, {
            context: {
                userId: this.userId,
            },
        }).onClose.subscribe(() => this.refreshProfileEvent.emit());
    }

    deleteAddress(id: number) {
        this.userService.deleteAddress(id).subscribe(
            () => {
                this.refreshProfileEvent.emit();
            },
            () => {
                this.toastService.danger('Please try again.', 'An error occurred!');
            }
        )
    }
}
