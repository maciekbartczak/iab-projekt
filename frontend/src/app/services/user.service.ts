import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CreateUserAddressRequest, UserAddressResponse, UserProfileResponse } from "../models/user.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    public getUserProfile(userId: string): Observable<UserProfileResponse> {
        return this.http.get<UserProfileResponse>(`api/user/${userId}/profile`);
    }

    public getUserAddresses(userId: number): Observable<UserAddressResponse[]> {
        return this.http.get<UserAddressResponse[]>(`api/user/${userId}/address`);
    }

    public addUserAddress(userId: string, address: CreateUserAddressRequest) {
        return this.http.post(`api/user/${userId}/address`, address);
    }

    public deleteAddress(addressId: number) {
        return this.http.delete(`api/user/address/${addressId}`);
    }
}
