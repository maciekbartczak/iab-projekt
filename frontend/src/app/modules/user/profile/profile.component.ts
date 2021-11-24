import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../../services/user.service";
import { UserAddressResponse, UserInfo } from "../../../models/user.model";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styles: []
})
export class ProfileComponent implements OnInit {

    userId: string = '';
    userInfo?: UserInfo;
    userAddresses?: UserAddressResponse[];

    constructor(private route: ActivatedRoute,
                private userService: UserService) {
        route.params.subscribe( params => this.userId = params.id);
    }

    ngOnInit(): void {
        this.fetchProfile();
    }

    fetchProfile() {
        this.userService.getUserProfile(this.userId).subscribe(
            (res) => {
                this.userInfo = res.userInfo;
                this.userAddresses = res.userAddresses;
            }
        );
    }

}
