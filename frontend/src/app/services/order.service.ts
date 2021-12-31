import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CreateOrderRequest, OrderInfo } from "../models/order.model";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) {
    }

    getAllUserOrders(userId: number): Observable<OrderInfo[]> {
        return this.http.get<OrderInfo[]>(`api/user/${userId}/orders`);
    }

    placeOrder(userId: number, body: CreateOrderRequest) {
        return this.http.post(`api/user/${userId}/order`, body);
    }

    makePayment(userId: number, orderId: number) {
        return this.http.put(`api/user/${userId}/order/${orderId}/pay`, {});
    }

    getAllOrders(): Observable<OrderInfo[]> {
        return this.http.get<OrderInfo[]>('api/admin/orders');
    }

}
