import { Component, Input, OnInit } from '@angular/core';
import { Product } from "../../../../models/product.model";

@Component({
    selector: 'app-product-table',
    templateUrl: './product-table.component.html',
    styles: []
})
export class ProductTableComponent implements OnInit {


    @Input()
    public products?: Product[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
