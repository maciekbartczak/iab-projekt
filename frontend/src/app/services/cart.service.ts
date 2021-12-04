import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AddCartItemRequest, CartResponse } from "../models/cart.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor(private http: HttpClient) {
    }

    addCartItem(userId: number, addCartItemRequest: AddCartItemRequest) {
        return this.http.post(`api/user/${userId}/cart/item`, addCartItemRequest);
    }

    getCart(userId: number): Observable<CartResponse> {
        return this.http.get<CartResponse>(`api/user/${userId}/cart`);
    }

    removeCartItem(userId: number, itemId: number) {
        return this.http.delete(`api/user/${userId}/cart/item/${itemId}`);
    }
}
