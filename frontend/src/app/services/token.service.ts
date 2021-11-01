import { Injectable } from '@angular/core';
import { User } from "../models/user.model";

const TOKEN_STORAGE_KEY = 'auth-token'

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor() {
    }

    public saveToken(token: string): void {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.setItem(TOKEN_STORAGE_KEY, token);
    }

    private getToken(): string | null {
        return localStorage.getItem(TOKEN_STORAGE_KEY);
    }

    public removeToken(): void {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
    }

    public getUser(): User | undefined{
        const token = this.getToken();
        if (!token) {
            return undefined;
        }
        return JSON.parse(atob(token.split('.')[1])).userDetails;
    }

}
