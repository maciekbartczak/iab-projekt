import { Component, OnInit } from '@angular/core';
import { CartService } from "../../../services/cart.service";
import { CartResponse } from "../../../models/cart.model";
import { AuthService } from "../../../services/auth.service";
import { User } from "../../../models/user.model";
import { NbToastrService } from "@nebular/theme";

@Component({
    selector: 'app-items-list',
    templateUrl: './items-list.component.html',
    styles: []
})
export class ItemsListComponent implements OnInit {

    cart?: CartResponse;
    private user?: User;

    constructor(private cartService: CartService,
                private authService: AuthService,
                private toastService: NbToastrService) {
        this.authService.currentUser.subscribe(
            (user) => this.user = user
        )
    }

    ngOnInit(): void {
       this.fetchCart();
    }


    removeProduct(id: string) {
        if (!this.user) {
            return ;
        }
        this.cartService.removeCartItem(this.user.id, id).subscribe(
            () => {
                this.toastService.success('', 'Product has been removed from your cart!');
                this.fetchCart();
            },
            () => {
                this.toastService.danger('Something went wrong!', 'Please try again.');
            }
        );
    }

    private fetchCart() {
        if (this.user) {
            this.cartService.getCart(this.user.id).subscribe(
                (response) => this.cart = response
            );
        }
    }
}
