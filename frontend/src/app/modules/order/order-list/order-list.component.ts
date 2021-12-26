import { Component, OnInit } from '@angular/core';
import { OrderService } from "../../../services/order.service";
import { OrderInfo } from "../../../models/order.model";
import { AuthService } from "../../../services/auth.service";
import { User } from "../../../models/user.model";
import { NbToastrService } from "@nebular/theme";

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
})
export class OrderListComponent implements OnInit {

    orders: OrderInfo[] = [];
    user?: User;

    constructor(private orderService: OrderService,
                private authService: AuthService,
                private toastService: NbToastrService) {
        this.authService.currentUser.subscribe(
            (user) => this.user = user
        )
    }

    ngOnInit(): void {
        if (this.user) {
            this.orderService.getAllOrders(this.user?.id).subscribe(
                (response) => this.orders = response,
                () => this.toastService.danger('Please try again.', 'Something went wrong!')
            )
        }
    }

}
