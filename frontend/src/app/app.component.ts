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
        {title: 'Profile'},
        {title: 'Logout'}
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
                map(({item}) => item.title),
            )
            .subscribe(title => {
                switch (title) {
                    case 'Profile':
                        this.router.navigate([`/user/${this.user?.id}/profile`])
                        break;
                    case 'Logout':
                        this.logout();
                        break;
                    default:
                        break;
                }

            });
    }

    private logout(): void {
        this.authService.logout();
        this.router.navigate(['/']);
    }


}
