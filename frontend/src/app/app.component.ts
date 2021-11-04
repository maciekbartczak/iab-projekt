import { Component, OnInit } from '@angular/core';
import { User } from "./models/user.model";
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";
import { NbMenuService } from "@nebular/theme";
import { filter, map } from "rxjs/operators";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    title = 'frontend';
    public user?: User;
    menuItems = [
        {title: 'Profile',},
        {
            title: 'Logout',
            data: {
                action: this.logout
            }
        }
    ];

    constructor(public authService: AuthService,
                private router: Router,
                private nbMenuService: NbMenuService) {
        this.authService.currentUser.subscribe(
            (user) => {
                this.user = user;
            }
        )
    }

    ngOnInit(): void {
        this.nbMenuService.onItemClick()
            .pipe(
                filter(({tag}) => tag === 'user-context-menu'),
                map(({item}) => item),
            )
            .subscribe(item => {
                const title = item.title;
                if (title === 'Logout') {
                    this.logout();
                }
            });
    }

    private logout(): void {
        this.authService.logout();
        this.router.navigate(['/']);
    }


}
