import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CreateOrderRequest, OrderInfo } from "../models/order.model";
import { UserAddressResponse } from "../models/user.model";

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

    shipOrder(id: number) {
        return this.http.put(`api/admin/order/${id}/ship`, {});
    }

    finishShipping(id: number) {
        return this.http.put(`api/admin/order/${id}/finish`, {});
    }

    getOrderAddress(userId: number, orderId: number): Observable<UserAddressResponse> {
        return this.http.get<UserAddressResponse>(`api/user/${userId}/order/${orderId}/address`);
    }

    getOrderAddressAdmin(orderId: number): Observable<UserAddressResponse> {
        return this.http.get<UserAddressResponse>(`api/order/${orderId}/address`);
    }
}
