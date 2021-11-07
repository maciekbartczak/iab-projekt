import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenService } from "./token.service";
import {AuthService} from "./auth.service";
import { NbToastrService } from "@nebular/theme";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {

    constructor(private tokenService: TokenService,
                private authService: AuthService,
                private router: Router,
                private jwtHelper: JwtHelperService,
                private toastService: NbToastrService) {
    }

    canLoad(): boolean {
        const token = this.tokenService.getToken();
        if (!token) {
            this.toastService.warning('Please log in to access that page.', 'Unauthorized!');
            this.router.navigate(['/auth/login']);
            return false;
        }
        if (this.jwtHelper.isTokenExpired(token)) {
            this.authService.logout();
            this.toastService.warning('Please log in again.', 'Session expired!');
            this.router.navigate(['/auth/login']);
            return false;
        }
        return true;
    }
}
