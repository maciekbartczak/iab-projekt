import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoginDetails, LoginResponse } from "../models/auth.model";
import { Observable, ReplaySubject } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { TokenService } from "./token.service";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public currentUser: Observable<User>;
    private currentUserSubject = new ReplaySubject<User>(1);

    constructor(private http: HttpClient,
                private tokenService: TokenService) {
        const user = tokenService.getUser();
        this.currentUser = this.currentUserSubject.asObservable();
        if (user) {
            this.currentUserSubject.next(user);
        }
    }

    public login(loginDetails: LoginDetails): Observable<LoginResponse> {
        return this.http.post<LoginResponse>('/auth/login', loginDetails)
            .pipe(
                shareReplay(),
                map(response => {
                    this.tokenService.saveToken(response.token);
                    const user = this.tokenService.getUser();
                    this.currentUserSubject.next(user);
                    return response;
                })
            );
    }

    public logout(): void {
        this.tokenService.removeToken();
        this.currentUserSubject.next(undefined);
    }
}
