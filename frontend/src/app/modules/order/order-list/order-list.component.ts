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
    loading = false;

    constructor(private orderService: OrderService,
                private authService: AuthService,
                private toastService: NbToastrService) {
        this.authService.currentUser.subscribe(
            (user) => this.user = user
        )
    }

    ngOnInit(): void {
       this.fetchOrders();
    }

    makePayment(event: Event, orderId: number) {
        event.stopPropagation();
        if (this.user) {
            this.loading = true;
            this.orderService.makePayment(this.user.id, orderId).subscribe(
                () => {
                    this.toastService.success('Payment finished successfully.', 'Success!')
                    this.fetchOrders();
                },
                () => this.toastService.danger('Please try again.', 'Something went wrong!'),
                () => this.loading = false
            )
        }
    }

    private fetchOrders() {
        if (this.user) {
            this.loading = true;
            this.orderService.getAllOrders(this.user?.id).subscribe(
                (response) => this.orders = response,
                () => this.toastService.danger('Please try again.', 'Something went wrong!'),
                () => this.loading = false
            )
        }
    }
}
