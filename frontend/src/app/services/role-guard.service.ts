import { Injectable } from '@angular/core';
import { TokenService } from "./token.service";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { NbToastrService } from "@nebular/theme";

@Injectable({
    providedIn: 'root'
})
export class RoleGuard {

    constructor(private tokenService: TokenService,
                private authService: AuthService,
                private router: Router,
                private jwtHelper: JwtHelperService) {
    }

    canLoad(): boolean {
        const token = this.tokenService.getToken();
        const decoded = this.jwtHelper.decodeToken(token);
        console.log(decoded)
        if (decoded.userDetails.role !== 'ADMIN') {
            this.authService.logout();
            this.router.navigate(['/auth/login']);
            return false;
        }

        return true;
    }
}
