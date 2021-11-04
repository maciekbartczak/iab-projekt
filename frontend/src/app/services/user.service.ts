import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserProfileResponse } from "../models/user.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    public getUserProfile(userId: string): Observable<UserProfileResponse> {
        return this.http.get<UserProfileResponse>(`/user/${userId}/profile`);
    }

}
