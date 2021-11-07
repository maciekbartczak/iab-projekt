import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { TokenService } from "../services/token.service";
import { catchError } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService,
                private authService: AuthService,
                private router: Router) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.tokenService.getToken();
        const req = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`)
        });
        return next.handle(req).pipe(catchError(e => this.handleAuthError(e)));
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {

        if (err.status === 403) {
            this.router.navigate(['/404']);
            return of(err.message);
        }
        return throwError(err);
    }
}
