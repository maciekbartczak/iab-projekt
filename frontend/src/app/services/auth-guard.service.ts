import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenService } from "./token.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {

    constructor(private tokenService: TokenService,
                private router: Router,
                private jwtHelper: JwtHelperService) {
    }

    canLoad(): boolean {
        const token = this.tokenService.getToken();
        if (this.jwtHelper.isTokenExpired(token)) {
            this.router.navigate(['/auth/login']);
            return false;
        }
        return true;
    }
}
