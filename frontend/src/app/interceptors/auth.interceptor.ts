import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { TokenService } from "../services/token.service";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService,
                private router: Router) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.tokenService.getToken();
        if (!token) {
            return next.handle(request).pipe(catchError(e => this.handleAuthError(e)));
        }
        const req = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`)
        });
        return next.handle(req).pipe(catchError(e => this.handleAuthError(e)));
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {

        if (err.status === 401) {
            this.router.navigate(['/auth/login']);
            return of(err.message);
        }
        return throwError(err);
    }
}
