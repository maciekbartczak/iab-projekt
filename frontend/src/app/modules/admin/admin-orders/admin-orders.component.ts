import { Component, OnInit } from '@angular/core';
import { OrderService } from "../../../services/order.service";
import { OrderInfo } from "../../../models/order.model";

@Component({
    selector: 'app-admin-orders',
    templateUrl: './admin-orders.component.html',
    styles: []
})
export class AdminOrdersComponent implements OnInit {

    orders?: OrderInfo[];
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
            (response) => this.orders = response,
            (err) => console.log(err),
            () => this.loading = false

        )
    }
}
