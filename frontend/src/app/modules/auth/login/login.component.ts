import { Component } from '@angular/core';
import { LoginDetails } from '../../../models/auth.model';
import { AuthService } from "../../../services/auth.service";
import { TokenService } from "../../../services/token.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent {

    public error = '';
    public loading = false;

    public loginData: LoginDetails = {
        username: '',
        password: ''
    }

    constructor(private authService: AuthService,
                private tokenService: TokenService,
                private route: ActivatedRoute,
                private router: Router) {
    }


    login() {
        if (this.loginData.username && this.loginData.password) {
            this.loading = true;

            this.authService.login(this.loginData)
                .subscribe(
                    () => {
                        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                        this.router.navigate([returnUrl]);
                    },
                    (err) => {
                        const errorMessage = err.error.error;
                        if (errorMessage === 'invalid-username-or-password') {
                            this.error = 'Invalid username or password';
                        } else {
                            this.error = 'Error occurred while logging in!';
                        }
                        this.loading = false;
                    }
                )
        }
    }

}
