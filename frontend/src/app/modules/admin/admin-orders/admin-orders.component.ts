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

    constructor(private orderService: OrderService) {
    }

    ngOnInit(): void {
        this.orderService.getAllOrders().subscribe(
            (response) => this.orders = response
        )
    }

}
