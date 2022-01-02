import {Injectable} from '@angular/core';
import {TokenService} from "./token.service";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class NotLoggedInGuard {

    constructor(private tokenService: TokenService,
                private router: Router) {
    }

    canLoad(): boolean {
        const token = this.tokenService.getToken();
        if (!token) {
            return true
        }
        this.router.navigate(['/products/list']);
        return false;
    }
}
