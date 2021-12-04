import { Component, OnInit } from '@angular/core';
import { CartService } from "../../../services/cart.service";
import { CartResponse } from "../../../models/cart.model";
import { AuthService } from "../../../services/auth.service";
import { User } from "../../../models/user.model";

@Component({
    selector: 'app-items-list',
    templateUrl: './items-list.component.html',
    styles: []
})
export class ItemsListComponent implements OnInit {

    cart?: CartResponse;
    private user?: User;

    constructor(private cartService: CartService,
                private authService: AuthService) {
        this.authService.currentUser.subscribe(
            (user) => this.user = user
        )
    }

    ngOnInit(): void {
        if (this.user) {
            this.cartService.getCart(this.user.id).subscribe(
                (response) => this.cart = response
            )
        }
    }



}
