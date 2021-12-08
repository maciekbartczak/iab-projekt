import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from "../../../../models/product.model";

@Component({
    selector: 'app-product-table',
    templateUrl: './product-table.component.html',
    styles: []
})
export class ProductTableComponent implements OnInit {


    @Input()
    public products?: Product[];

    @Output()
    public addToCartEvent: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit(): void {
    }

    addToCart(id: number) {
        this.addToCartEvent.emit(id);
    }
}
