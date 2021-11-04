import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../../services/user.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styles: []
})
export class ProfileComponent implements OnInit {

    userId: string = '';

    constructor(private route: ActivatedRoute,
                private userService: UserService) {
        route.params.subscribe( params => this.userId = params.id);
    }

    ngOnInit(): void {
        this.userService.getUserDetails(this.userId).subscribe();
    }

}
