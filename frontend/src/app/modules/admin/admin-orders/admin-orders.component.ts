import { Component, OnInit } from '@angular/core';
import { OrderService } from "../../../services/order.service";
import { OrderInfo } from "../../../models/order.model";
import { UserAddressResponse } from "../../../models/user.model";

@Component({
    selector: 'app-admin-orders',
    templateUrl: './admin-orders.component.html',
    styles: []
})
export class AdminOrdersComponent implements OnInit {

    orders?: OrderInfo[];
    orderAddress: UserAddressResponse[] = [];
    loading = false;

    constructor(private orderService: OrderService) {
    }

    ngOnInit(): void {
        this.fetchOrders();
    }

    shipOrder($event: Event, id: number) {
        $event.stopPropagation();
        this.orderService.shipOrder(id).subscribe(
            () => this.fetchOrders()
        )
    }


    finishShipping($event: Event, id: number) {
        $event.stopPropagation();
        this.orderService.finishShipping(id).subscribe(
            () => this.fetchOrders()
        )
    }

    private fetchOrders() {
        this.loading = true;
        this.orderService.getAllOrders().subscribe(
            (response) => {
                this.orders = response;
                this.fetchOrdersAddress();
            },
            (err) => console.log(err),
            () => this.loading = false
        )
    }

    private fetchOrdersAddress() {
        if (this.orders) {
            this.orders.forEach(order => {
                this.orderService.getOrderAddressAdmin(order.order.id).subscribe(
                    (response) => this.orderAddress.push(response)
                )
            })
        }
    }

    getOrderAddressAsArray(address: UserAddressResponse): UserAddressResponse[] {
        return [address];
    }
}
