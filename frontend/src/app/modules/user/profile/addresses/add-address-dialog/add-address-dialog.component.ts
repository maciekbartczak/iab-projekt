import { Component, Input, OnInit } from '@angular/core';
import { CreateUserAddressRequest } from "../../../../../models/user.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../../../../services/user.service";

@Component({
    selector: 'app-add-address-dialog',
    templateUrl: './add-address-dialog.component.html',
    styles: []
})
export class AddAddressDialogComponent implements OnInit {

    @Input()
    userId = '';

    addressForm: FormGroup;
    error = '';
    loading = false;
    submitted = false;

    model: CreateUserAddressRequest = {
        addressLine1: '',
        addressLine2: '',
        city: '',
        postalCode: '',
        country: '',
        phoneNumber: ''
    };


    constructor(private formBuilder: FormBuilder,
                private userService: UserService) {
        this.addressForm = this.formBuilder.group({
                addressLine1: ['', Validators.required],
                addressLine2: [''],
                city: ['', Validators.required],
                postalCode: ['', Validators.required],
                country: ['', Validators.required],
                phoneNumber: ['', Validators.required],
        });
    }

    ngOnInit(): void {
    }

    addAddress() {
        this.submitted = true;

        if (this.addressForm.invalid) {
            return;
        }

        this.loading = true;

        this.userService.addUserAddress(this.userId, this.model).subscribe(
            () => {
                this.loading = false;
            },
            () => {
                this.error = 'Error occurred! Please try again later';
                this.loading = false;
            }
        )
    }
}
