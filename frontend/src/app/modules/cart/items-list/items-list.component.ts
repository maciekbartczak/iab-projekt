import { Component, OnInit } from '@angular/core';
import { CartService } from "../../../services/cart.service";
import { CartResponse } from "../../../models/cart.model";
import { AuthService } from "../../../services/auth.service";
import { User } from "../../../models/user.model";
import { NbToastrService } from "@nebular/theme";
import {AuthGuardService} from "../../../services/auth-guard.service";

@Component({
    selector: 'app-items-list',
    templateUrl: './items-list.component.html',
    styles: []
})
export class ItemsListComponent implements OnInit {

    cart?: CartResponse;
    private user?: User;
    loading = false;

    constructor(private cartService: CartService,
                private authService: AuthService,
                private toastService: NbToastrService,
                public authGuard: AuthGuardService) {
        this.authService.currentUser.subscribe(
            (user) => this.user = user
        )
    }

    ngOnInit(): void {
       this.fetchCart();
    }


    removeProduct(id: string) {
        this.loading = true;
        if (!this.user) {
            return ;
        }
        this.cartService.removeCartItem(this.user.id, id).subscribe(
            () => {
                this.toastService.success('', 'Product has been removed from your cart!');
                this.fetchCart();
                this.loading = false;
            },
            () => {
                this.toastService.danger('Something went wrong!', 'Please try again.');
                this.loading = false;
            }
        );
    }

    private fetchCart() {
        this.loading = true;
        if (this.user) {
            this.cartService.getCart(this.user.id).subscribe(
                (response) => {
                    this.cart = response;
                    this.loading = false;
                },
                () =>{
                    this.loading = false;
                }
            );
        }

    }
}
