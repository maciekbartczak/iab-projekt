import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { loginDetails, loginResponse } from "../models/auth.model";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    public login(loginDetails: loginDetails): Observable<loginResponse> {
        return this.http.post<loginResponse>('/auth/login', loginDetails)
            .pipe(
                shareReplay(),
                map(response => response)
            );
    }
}
