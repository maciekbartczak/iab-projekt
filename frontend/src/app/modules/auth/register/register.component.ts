import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterRequest } from "../../../models/auth.model";
import { AuthService } from "../../../services/auth.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: []
})
export class RegisterComponent {

    registerForm: FormGroup;
    error = '';
    loading = false;
    submitted = false;

    model: RegisterRequest = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    };

    constructor(private authService: AuthService,
                private formBuilder: FormBuilder) {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
        });
    }


    register(): void {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;

        this.authService.register(this.model).subscribe(
            () => {
                console.log('success');
                this.loading = false;
            },
            (err) => {
                const errorMessage = err.error.error;
                if (errorMessage === 'user-exists') {
                    this.error = 'Username taken!';
                } else {
                    this.error = 'Error occurred! Please try again later';
                }
                this.loading = false;
            }
        )
    }
}
