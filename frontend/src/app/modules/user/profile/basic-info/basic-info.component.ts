import { Component, Input } from '@angular/core';
import { UserInfo } from "../../../../models/user.model";

@Component({
    selector: 'app-basic-info',
    templateUrl: './basic-info.component.html',
    styles: []
})
export class BasicInfoComponent {

    @Input()
    userInfo?: UserInfo;

    constructor() {
    }

}
