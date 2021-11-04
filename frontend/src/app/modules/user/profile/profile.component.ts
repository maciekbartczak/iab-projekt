import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../../services/user.service";
import { UserProfileResponse } from "../../../models/user.model";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styles: []
})
export class ProfileComponent implements OnInit {

    userId: string = '';
    userProfile?: UserProfileResponse;

    constructor(private route: ActivatedRoute,
                private userService: UserService) {
        route.params.subscribe( params => this.userId = params.id);
    }

    ngOnInit(): void {
        this.userService.getUserProfile(this.userId).subscribe(
            (res) => {
                this.userProfile = res;
            }
        );
    }

}
