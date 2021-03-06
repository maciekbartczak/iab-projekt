import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {CartResponse} from "../../../models/cart.model";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {User, UserAddressResponse} from "../../../models/user.model";
import {OrderService} from "../../../services/order.service";
import { NbDialogService, NbToastrService } from "@nebular/theme";
import { AddAddressDialogComponent } from "../../user/profile/addresses/add-address-dialog/add-address-dialog.component";

@Component({
    selector: 'app-new-order',
    templateUrl: './new-order.component.html',
})
export class NewOrderComponent implements OnInit {
    cart?: CartResponse;
    private state$?: Observable<object>;
    user?: User;
    userAddress?: UserAddressResponse[];
    selectedAddress?: UserAddressResponse;
    selectedAddressIndex?: number;

    constructor(private route: ActivatedRoute,
                private authService: AuthService,
                private userService: UserService,
                private orderService: OrderService,
                private toastService: NbToastrService,
                private router: Router,
                private dialogService: NbDialogService) {
    }

    ngOnInit(): void {
        this.state$ = this.route.paramMap
            .pipe(map(() => window.history.state));
        this.state$.subscribe(
            (s: any) => {
                this.cart = s.cart;
            }
        )

        this.authService.currentUser.subscribe(
            (user) => this.user = user
        )

        this.fetchAddress();
    }


    changeSelectedAddress($event: { address: UserAddressResponse, index: number }) {
        this.selectedAddress = $event.address;
        this.selectedAddressIndex = $event.index;
        console.log(this.selectedAddress);
    }

    selectedAddressAsArray(): UserAddressResponse[] {
        if (this.selectedAddress) {
            return [this.selectedAddress];
        }
        return [];
    }

    placeOrder(): void {
        if (!this.user || !this.cart || !this.selectedAddress) {
            return ;
        }
        this.orderService.placeOrder(this.user.id, {addressId: this.selectedAddress.id, cartId: this.cart?.cartInfo.id}).subscribe(
            () => {
                this.router.navigate(['/order/list'])
                this.toastService.success('Your order has been placed.', 'Success!')
            },
            () => {
                this.toastService.danger('There was an error processing your order. Try again later.', 'Something went wrong!')
            }
        );
    }

    fetchAddress() {
        if (this.user) {
            this.userService.getUserAddresses(this.user.id).subscribe(
                (res) => this.userAddress = res
            )
        }
    }

    openAddAddressDialog() {
        if (this.user) {
            this.dialogService.open(AddAddressDialogComponent, {
                context: {
                    userId: this.user.id.toString(),
                },
            }).onClose.subscribe(() => this.fetchAddress());
        }
    }
}
